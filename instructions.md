Phase 0 – Full audit and mapping (no code changes)
Goal: Understand all current data consumers and duplicates before touching logic.

Map shared state usage

Search all JS files under FA/, HOM/, PRE/, Patient/, and shared/ for hospitalFinanceAppState, patientAuthAccounts, CanonicalHospitalSeed, localStorage.getItem.

For each occurrence, note:

Which key(s) it reads/writes.

Which slices of state it expects (e.g. patients, patientDirectory, admissions, billingRecords, ledgers, faLedgerRequests, pendingAdmissions, bedRequests).

Document duplicates and inconsistencies

From canonical-seed.js, list overlapping entities: patientDirectory, patientProfiles, patients, admissions, billingRecords, ledgers, preRequests, pendingAdmissions, faLedgerRequests, bedRequests, bedAllocations.

Cross‑check with the Problems doc (e.g. duplicate billing/ledger arrays, non‑1:1 bed–patient mapping) and record everything in a simple markdown file in the repo (instructions.md or docs/cleanup-notes.md).

Exit criteria: You have a written inventory of every module’s state usage and known duplication; no code changed yet.

Phase 1 – Shared state & ID consistency (no schema changes)
Goal: Centralize app state access and replace ad‑hoc ID generation, without altering the shape of buildSharedStateSeed().

Introduce shared ID generator

Add shared/id-generator.js with something like nextId(namespace) using a monotonic counter for dev/demo; reserve the option of UUIDs later.

Replace every Date.now() or custom string IDs in FA, HOM, PRE, Patient modules (admissions, service requests, bed requests, ledger entries, receipts, etc.) to go through this generator.

Centralize state in a single root key

Use the migration helpers pattern already in canonical-seed.js: migrateStoredJson, migrateValue.

Define a single root key, e.g. HospitalAppState, and create a bootstrapping adapter that:

Reads legacy keys (hospitalFinanceAppState, patientAuthAccounts).

Uses migrateStoredJson to normalize IDs (MOCK_ID_MIGRATION_MAP).

Writes the merged structure into HospitalAppState.

Role‑specific adapters

For each role, create a thin adapter module, e.g. HOM/hom-storage.js, FA/fa-storage.js, PRE/pre-state.js, Patient/patient-state.js, that exposes getters/setters over HospitalAppState instead of raw localStorage.

Refactor existing code gradually to use these adapters; keep old paths during this phase if needed for safety (behind a flag).

Exit criteria:

No new IDs are created via Date.now; all module code uses id-generator.

All roles read/write through a single root key (possibly via adapters), and old keys are migrated or treated as read‑only compatibility shims.

Phase 2 – Data normalization & seed cleanup
Goal: Remove duplicated arrays and align beds/patients with the unified shared state, still preserving backward‑compatible views where necessary.

Design single source‑of‑truth schema

Consolidate patient information into one canonical structure:

Use patientProfiles (keyed by UHID/id) as the main patient map.

Treat patientDirectory and patients as derived views (lists) that can be generated from the canonical patient map instead of stored separately.

Normalize admissions, ledgers, and billing

Keep admissions as the primary admission map (keyed by admission id) and ledgers keyed by ledger_id.

Plan to eliminate billingRecords and map UI billing screens to admissions + ledgers instead.

Beds ↔ patients

Update wards[].beds[].patient to use patientId/uhid instead of free‑text names; read names from the unified patient map in the UI.

Adjust HOM bed‑management JS to always resolve the patient object via this ID.

Seed changes with compatibility

Update buildSharedStateSeed() to the normalized schema, but add helper functions that can derive legacy arrays (patients, billingRecords, etc.) if some UIs still expect them during the migration.

Remove module‑level hardcoded mock arrays (e.g. inline patient lists, department lists) and load everything from the shared state.

Exit criteria:

Each logical entity (patient, admission, ledger, bed) lives in exactly one canonical location in the state; any list views are derived.

UI still works for all roles using the new source of truth.

Phase 3 – Role‑based sanitization and safety checks
Goal: Fix orphaned approvals and data leaks by enforcing strong role views and pre‑action validation.

Implement sanitizeForRole

Create shared/sanitizer.js or extend shared/rbac.js with sanitizeForRole(artifact, role) that deep‑clones and strips internal fields like link, internal_id, raw ledger IDs, debug status flags, and insurance details that HOM/Patient must not see.

Use this in all boundaries where data crosses roles:

HOM viewing PRE/FA data (bed requests, financial info).

Patient viewing billing/admission summaries.

Enforce orphan‑free approvals

In FA JS, implement validateLedgerExists(admissionId) using the centralized state.

Wrap approval/closure actions so they:

Call validateLedgerExists before enabling buttons.

Disable buttons and show a tooltip (e.g. “No ledger found for this admission”) when false.

Align navigation with RBAC

Use shared/rbac.js to:

Remove HOM’s “Finance Control” entry and any other modules forbidden in Problems.md.

Guard direct URL navigation for restricted pages; redirect to login/“Not allowed” if role is not permitted.

Exit criteria:

HOM and Patient UIs show only sanitized, role‑appropriate data (no internal IDs/links/policy numbers).

FA cannot approve/close services without a backing ledger entry; orphaned approvals are impossible from the UI.

Phase 4 – Core workflow fixes (payments, insurance, inventory, discharge)
Goal: Correct the inverted payment flow, move payment method selection to Patient, implement capped insurance logic, and connect inventory with ledgers and discharge.

Financial state machine

Add shared/finance-state.js implementing a simple state machine (e.g. DRAFT → PENDING_VERIFICATION → PAID) with transition helpers.

Replace raw status strings in FA/Patient modules with calls to this state machine.

Payment flow (Patient → FA)

Patient billing screen:

Add a “Mark as Paid” action that updates the shared state, sets ledger status to PENDING_VERIFICATION, and records paymentMethod (UPI/CARD/CASH etc.).

FA screens:

Show a read‑only list of PENDING_VERIFICATION items with method and amount.

For cash, implement two steps: “Collected” (internal flag) then “Confirm Receipt” (transition to PAID).

Insurance policy object

Change the model from a single coverage number to an insurancePolicy object on relevant records: coverage_limit, copay_percentage, excluded_services, etc.

Create shared/insurance.js with a function that computes:

Total Owed = Total - min(coverage_limit, Total * copay_percentage) after excluding excluded_services from coverage.

Call this validator on:

HOM discharge confirm.

Patient “Your share” calculation.

Block discharge if insurance validation fails or policy is missing.

Inventory → ledger chain

When HOM records service usage:

Decrement the relevant item in inventoryItems.

If stock <= reorderLevel, add a warning entry in activityLog.

Push a notification for FA to add that service to the patient’s ledger.

Feature flags for safe rollout

Guard new logic with flags (e.g. PAYMENT_FLOW_V2, INSURANCE_OBJECT), default off.

Turn on in dev branches and test end‑to‑end before enabling in your main demo.

Exit criteria:

Payment initiation lives on Patient; FA only verifies and confirms.

Insurance calculations are consistent between Patient and HOM and correctly capped.

Inventory usage is reflected in ledgers and low stock surfaces via activity logs.

Phase 5 – UI & navigation cleanup per module
Goal: Implement the Problems.md UI changes once workflows are stable.

HOM module
Beds:

Replace reserved with maintenance as the third status everywhere (state + UI).

Navigation:

Remove “Finance Control” from HOM navbar; move “Clinical Service Orders” to Inventory and “Finance Dispatch Queue” to Billing Summary.

Dashboard:

Remove: “Today” button, “+Assign Bed”, “PRIORITY” column, quick actions, ward occupancy summary, recent operations log.

Patient Flow:

Allow discharge only for PRE‑requested patients; remove transfer option.

Bed Management:

Remove “+Allocate Bed” button; rely on PRE → HOM bed request flow.

FA module
Dashboard:

Remove analytics; show only new admission ledger requests and verification queues mapped to the new payment state machine.

Navigation:

Move “Patient Billing Queue” under “Ledgers” and “HOM Discharge/Billing Requests” under a dedicated Discharge module.

PRE module
Departments:

Replace all department dropdowns/lists with the standardized set: ICU, General, Surgical, Pediatric, Emergency, Maternity, using shared constants.

Appointments:

Add doctor availability dates and allow PRE to create appointments for walk‑ins as specified in Problems.md.

State:

Ensure PRE writes to HospitalAppState only, not local ad‑hoc keys.

Patient module
Billing:

Show the new statuses (PENDING_VERIFICATION, PAID) after “Mark as Paid”; hide back‑office flags used by FA/HOM.

Navigation:

Clean up so Patient cannot reach admin‑only pages; enforce via rbac and redirect on direct URL hits.

Exit criteria:

All UI/UX changes in Problems.md are reflected, and navigation matches your intended role responsibilities.

Phase 6 – Data consistency, enums, and versioning
Goal: Make configuration consistent and future‑proof migrations.

Shared constants

Move departments, bed statuses, ward types, and other enums into shared/constants.js or embed clearly in canonical-seed and import them.

Replace all module‑local definitions with imports so that changing a label requires only editing shared constants.

State versioning

Add stateVersion to the root of buildSharedStateSeed() (e.g. "2.0.0").

Implement migrateState(currentVersion) that can be extended as you change schema in the future, reusing the existing migrateStoredJson pattern.

Purge remaining mock data

Search all JS for hardcoded patients, departments, statuses, or sample rows; replace them with data from HospitalAppState and shared constants.

Exit criteria:

All modules share the same enums and configuration; any future schema change goes through a single versioned migration pipeline.

Phase 7 – Regression testing and final hardening
Goal: Ensure no regressions and remove temporary flags/paths once stable.

Per‑role smoke tests

PRE: create admissions/appointments and verify they appear correctly in HOM and FA with correct departments and statuses.

HOM: allocate beds, handle patient flow, perform discharge with and without insurance; verify bed statuses are only occupied/available/maintenance.

FA: process ledger requests, verify payments for UPI/CARD/CASH via the state machine; confirm no action works without an associated ledger.

Patient: book appointments, view profile, view bills, “Mark as Paid”, and verify amounts match HOM/FA.

LocalStorage/state inspection

Inspect localStorage and ensure:

Only the unified HospitalAppState (and any auth keys) are used.

The structure matches canonical-seed + your added fields.

Clean up flags and dead code

Once tests pass for multiple runs:

Remove feature flags such as PAYMENT_FLOW_V2, INSURANCE_OBJECT, and legacy branches that are no longer needed.

Delete obsolete code paths for legacy statuses, duplicates, and deprecated UIs.

Exit criteria:

All problems from Problems.md are satisfied; the app can be demoed purely from CanonicalHospitalSeed without manual data hacking.

How to “go through each and every file” practically
To avoid getting lost, combine the phases above with a systematic file walk‑through per module.

shared/

Ensure canonical-seed.js is the only place defining seed data; add id-generator.js, rbac.js, sanitizer.js, finance-state.js, insurance.js, and constants.js here as you implement the phases.

HOM/, FA/, PRE/, Patient/

For each JS file:

Confirm it reads/writes through the shared state adapter and uses id-generator, not raw localStorage or Date.now.

Check all fields referenced exist in the canonical schema (from canonical-seed.js) or in shared constants.

Where it renders cross‑role data, ensure sanitizeForRole is applied.

For each HTML file:

Ensure navigation only shows modules allowed by RBAC for that role.

Confirm buttons and links align with the new workflows (“Mark as Paid”, two‑step cash confirmation, restricted discharge, etc.).

landing/, login/, signup/

Verify they only handle authentication/routing and do not duplicate state logic; they should delegate to shared state/role modules where needed.