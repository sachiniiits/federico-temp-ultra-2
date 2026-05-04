export declare class CreateAdmissionDto {
    admission_id?: number;
    ledger_id?: number;
    patient_name: string;
    uhid: string;
    ward_no: string;
    doctor_assigned: string;
    coverage: number;
    insurance_provider: string;
    discharged?: boolean;
}
