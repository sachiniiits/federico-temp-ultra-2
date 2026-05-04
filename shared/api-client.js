/**
 * shared/api-client.js
 * Bridge between Frontend (localStorage) and Backend (NestJS API).
 *
 * Strategy:
 *  - On load   → MERGE backend state into localStorage (backend wins for most keys,
 *                but local arrays like preRequests are union-merged so nothing is lost)
 *  - On change → push to backend only when state actually changes (event-driven)
 *  - No polling interval → zero unnecessary requests when user is idle
 */

(function () {
  var API_BASE_URL = "http://localhost:3000";
  var ROOT_STORAGE_KEY = "HospitalAppState";

  // Track last pushed state hash to avoid duplicate POSTs
  var _lastPushedHash = null;

  function _hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = (h * 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
  }

  /**
   * Merge two arrays by unique id/appointmentId — local wins over remote for the same id.
   */
  function _mergeArrays(localArr, remoteArr) {
    if (!Array.isArray(remoteArr)) return Array.isArray(localArr) ? localArr : [];
    if (!Array.isArray(localArr)) return remoteArr;

    var seen = new Set();
    var merged = [];

    // Local items take priority
    localArr.forEach(function(item) {
      var key = item.id || item.appointmentId || item.entry_id || item.admission_id || JSON.stringify(item);
      seen.add(String(key));
      merged.push(item);
    });

    // Add remote items not already present locally
    remoteArr.forEach(function(item) {
      var key = item.id || item.appointmentId || item.entry_id || item.admission_id || JSON.stringify(item);
      if (!seen.has(String(key))) {
        merged.push(item);
      }
    });

    return merged;
  }

  /**
   * Merge backend state into local state.
   * Arrays are union-merged (local + remote, no duplicates).
   * Scalar values default to remote.
   * Objects are shallow-merged (local wins).
   */
  function _mergeStates(localState, remoteState) {
    if (!remoteState || typeof remoteState !== "object") return localState;
    if (!localState || typeof localState !== "object") return remoteState;

    var result = Object.assign({}, remoteState);

    var arrayKeys = [
      "preRequests", "pendingAdmissions", "patients", "dispatchQueue",
      "paymentConfirmations", "receipts", "publishedBills", "faLedgerRequests",
      "serviceRequests", "billingRecords", "bedRequests", "bedAllocations",
      "emergencyNotifications", "appointments", "activityLog", "doctors",
      "inventoryItems", "patientDirectory"
    ];

    arrayKeys.forEach(function(key) {
      result[key] = _mergeArrays(localState[key], remoteState[key]);
    });

    // Merge object maps (admissions, ledgers, patientProfiles) — local wins per key
    ["admissions", "ledgers", "patientProfiles"].forEach(function(key) {
      if (localState[key] && typeof localState[key] === "object") {
        result[key] = Object.assign({}, remoteState[key] || {}, localState[key]);
      }
    });

    return result;
  }

  async function fetchFullState() {
    try {
      var response = await fetch(API_BASE_URL + "/data/full-state", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } catch (err) {
      console.warn("[APIClient] GET failed:", err.message);
      return null;
    }
  }

  async function pushFullState(state) {
    try {
      var payload = JSON.stringify(state || {});
      var hash = _hash(payload);

      // Skip if state hasn't changed since last push
      if (hash === _lastPushedHash) return null;
      _lastPushedHash = hash;

      var response = await fetch(API_BASE_URL + "/data/full-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } catch (err) {
      console.warn("[APIClient] POST failed:", err.message);
      return null;
    }
  }

  /**
   * On page load:
   * 1. Read what's already in localStorage (could have fresh local data)
   * 2. Fetch backend state
   * 3. Merge them (union arrays, local wins on conflicts)
   * 4. Write merged result back to localStorage and push to backend
   */
  async function initializeSync() {
    try {
      var localRaw = localStorage.getItem(ROOT_STORAGE_KEY);
      var localState = localRaw ? JSON.parse(localRaw) : {};

      var remoteState = await fetchFullState();

      if (remoteState && Object.keys(remoteState).length > 0) {
        var merged = _mergeStates(localState, remoteState);
        var mergedPayload = JSON.stringify(merged);
        localStorage.setItem(ROOT_STORAGE_KEY, mergedPayload);

        // Seed the hash so the next push is only sent if something actually changed
        _lastPushedHash = _hash(mergedPayload);

        window.dispatchEvent(new Event("sharedStateUpdated"));
        console.log("[APIClient] ✅ State merged from backend on load.");
      }
    } catch (err) {
      console.warn("[APIClient] Init sync failed:", err.message);
    }
  }

  window.APIClient = {
    fetchFullState: fetchFullState,
    pushFullState: pushFullState,
    initializeSync: initializeSync
  };

  // Auto-initialize only once per page
  if (!window.APIClientInitialized) {
    window.APIClientInitialized = true;
    initializeSync();
  }
})();
