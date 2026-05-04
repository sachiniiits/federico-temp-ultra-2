import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  stateVersion = "2.0.0";
  stats = {
    revenue: 284500,
    activeIPD: 6,
    pendingClaims: 24,
    failedPayments: 5,
    homRequests: 7
  };
  doctors = [
    { id: "D101", name: "Dr Qasim", specialization: "Cardiology", start: "9:00 AM", end: "1:00 PM", status: "Available" },
    { id: "D102", name: "Dr Kammran", specialization: "Orthopedics", start: "2:00 PM", end: "7:00 PM", status: "Available" },
    { id: "D103", name: "Dr Hamiz", specialization: "Neurology", start: "11:00 AM", end: "4:00 PM", status: "Not Available" },
    { id: "D104", name: "Dr Sachin", specialization: "Dermatology", start: "10:00 AM", end: "3:00 PM", status: "Available" }
  ];
  wards = [
    {
      name: "ICU Ward",
      total: 10,
      occupied: 8,
      available: 1,
      maintenance: 1,
      beds: [
        { number: "ICU-01", status: "occupied", patient: "Mohammed Kamran" },
        { number: "ICU-02", status: "occupied", patient: "Amit Kumar" },
        { number: "ICU-03", status: "occupied", patient: "Priya Shah" },
        { number: "ICU-04", status: "occupied", patient: "Sunita D." },
        { number: "ICU-05", status: "available" },
        { number: "ICU-06", status: "occupied", patient: "Kiran P." },
        { number: "ICU-07", status: "occupied", patient: "Meena S." },
        { number: "ICU-08", status: "occupied", patient: "Rajesh K." },
        { number: "ICU-09", status: "maintenance" },
        { number: "ICU-10", status: "occupied", patient: "Anjali M." }
      ]
    },
    { name: "General Ward", total: 20, occupied: 16, available: 2, maintenance: 2, beds: [] },
  ];
  inventoryItems = [
    { item_id: 1, name: "Admission Kit", category: "Consumable", stock: 45, reorderLevel: 20, unit: "kit", unitCost: 850 },
    { item_id: 2, name: "IV Cannula (18G)", category: "Consumable", stock: 12, reorderLevel: 50, unit: "piece", unitCost: 45 },
    { item_id: 3, name: "Linen Set (Single)", category: "Consumable", stock: 8, reorderLevel: 30, unit: "set", unitCost: 320 },
    { item_id: 4, name: "Oxygen Cylinder", category: "Equipment", stock: 22, reorderLevel: 10, unit: "cylinder", unitCost: 1200 },
    { item_id: 8, name: "Paracetamol 500mg", category: "Medicine", stock: 520, reorderLevel: 250, unit: "tablet", unitCost: 2 }
  ];
  activityLog = [
    { id: 1, type: "success", text: "Bed ICU-05 assigned to Mohammed Kamran (FED-2026-882105)", time: "5 min ago" },
    { id: 2, type: "info", text: "Admission request approved for Sunita Sharma", time: "22 min ago" },
  ];
  patientDirectory = [
    { id: "FED-2026-9001", name: "Arun Mehta", age: "54", gender: "Male", phone: "9876543210", address: "Banjara Hills" },
    { id: "FED-2026-9002", name: "Sunita Sharma", age: "43", gender: "Female", phone: "9123456780", address: "Secunderabad" },
    { id: "FED-2026-9003", name: "Rajan Pillai", age: "52", gender: "Male", phone: "9012345678", address: "Madhapur" },
    { id: "FED-2026-9004", name: "Divya Nair", age: "36", gender: "Female", phone: "9345678901", address: "Jubilee Hills" },
    { id: "FED-2026-9005", name: "Mohammed Ali", age: "38", gender: "Male", phone: "9988776655", address: "Kukatpally" },
    { id: "FED-2026-882100", name: "Qasim Sheikh", age: "58", gender: "Male", phone: "9001100110", address: "Gachibowli, Hyderabad" },
    { id: "FED-2026-882105", name: "Mohammed Kamran", age: "42", gender: "Male", phone: "9002200220", address: "Tolichowki, Hyderabad" },
    { id: "FED-2026-882110", name: "Ayaan Khan", age: "24", gender: "Male", phone: "9812345678", address: "12-A, Sector 4, Hyderabad, Telangana - 500001" },
  ];
  patientProfiles = {};
  preRequests = [
    {
      id: "PRE-DEMO-1001",
      appointmentId: "PRE-APT-DEMO-1001",
      patientId: "FED-2026-9001",
      name: "Arun Mehta",
      age: "54",
      gender: "Male",
      department: "Cardiology",
      status: "Pending",
      homStatus: "Awaiting HOM",
    }
  ];
  pendingAdmissions = [];
  patients = [];
  admissions: Record<number, any> = {
    701: { admission_id: 701, ledger_id: 801, patient_name: "Qasim Sheikh", uhid: "FED-2026-882100", ward_no: "G-102", doctor_assigned: "Dr. Sharma", coverage: 1500, insurance_provider: "Star Health", discharged: false },
    702: { admission_id: 702, ledger_id: 802, patient_name: "Mohammed Kamran", uhid: "FED-2026-882105", ward_no: "ICU-05", doctor_assigned: "Dr. Varma", coverage: 0, insurance_provider: "N/A", discharged: false }
  };
  ledgers: Record<number, any[]> = {
    801: [
      { entry_id: 1, service_name: "Consultation", qty: 1, price: 500, tax: 0, ts: Date.now() },
      { entry_id: 2, service_name: "General Ward", qty: 2, price: 3000, tax: 300, ts: Date.now() }
    ],
    802: [
      { entry_id: 3, service_name: "ICU Charges", qty: 3, price: 8000, tax: 1200, ts: Date.now() }
    ]
  };
  faLedgerRequests = [];
  serviceRequests = [];
  billingRecords = [];
  dispatchQueue = [];
  paymentConfirmations = [];
  receipts = [
    { id: 901, patient: "Qasim Sheikh", uhid: "FED-2026-882100", amount: 3100, gross: 4600, coverage: 1500, insurance: "Star Health", mode: "UPI", status: "Paid", ts: Date.now() }
  ];
  publishedBills = [];
  bedRequests = [];
  bedAllocations = [];
  emergencyNotifications = [];
  currentPatientId = 701;
  appointments = [];
}
