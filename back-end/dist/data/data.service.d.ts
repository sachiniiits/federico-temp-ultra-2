export declare class DataService {
    stateVersion: string;
    stats: {
        revenue: number;
        activeIPD: number;
        pendingClaims: number;
        failedPayments: number;
        homRequests: number;
    };
    doctors: {
        id: string;
        name: string;
        specialization: string;
        start: string;
        end: string;
        status: string;
    }[];
    wards: {
        name: string;
        total: number;
        occupied: number;
        available: number;
        maintenance: number;
        beds: ({
            number: string;
            status: string;
            patient: string;
        } | {
            number: string;
            status: string;
            patient?: undefined;
        })[];
    }[];
    inventoryItems: {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    }[];
    activityLog: {
        id: number;
        type: string;
        text: string;
        time: string;
    }[];
    patientDirectory: {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
    }[];
    patientProfiles: {};
    preRequests: {
        id: string;
        appointmentId: string;
        patientId: string;
        name: string;
        age: string;
        gender: string;
        department: string;
        status: string;
        homStatus: string;
    }[];
    pendingAdmissions: never[];
    patients: never[];
    admissions: Record<number, any>;
    ledgers: Record<number, any[]>;
    faLedgerRequests: never[];
    serviceRequests: never[];
    billingRecords: never[];
    dispatchQueue: never[];
    paymentConfirmations: never[];
    receipts: {
        id: number;
        patient: string;
        uhid: string;
        amount: number;
        gross: number;
        coverage: number;
        insurance: string;
        mode: string;
        status: string;
        ts: number;
    }[];
    publishedBills: never[];
    bedRequests: never[];
    bedAllocations: never[];
    emergencyNotifications: never[];
    currentPatientId: number;
    appointments: never[];
}
