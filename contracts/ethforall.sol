// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract EthForAll {
    string public name;
    address[] public patientAddresses;
    address[] public doctorAddresses;

    constructor() public {
        name = "ETHforAll";
    }

    struct PatientData {
        address patient_address;
        uint256 age;
        uint256 height;
        uint256 weight;
        string bloodGroup;
        string gender;
        uint256 noOfReports;
    }
    struct DoctorData {
        address doctor_address;
        uint256 doctor_id;
        string hospital;
        string department;
    }

    struct ReportData {
        uint256 report_id;
        string fileHash;
        address doctor;
        address patient;
        uint256 time;
        bool isVisible;
    }
    event ReportAdded(string _fileHash, address patient_address);
    event PatientAdded(
        uint256 age,
        uint256 height,
        uint256 weight,
        string bloodGroup,
        string gender
    );
    event DoctorAdded(uint256 doctor_id, string hospital, string department);
    event VisibilityChanged(
        address patient_address,
        uint256 record_id,
        bool isVisible
    );

    mapping(address => mapping(uint256 => ReportData)) PatientFiles;
    mapping(address => PatientData) Patients;
    mapping(address => DoctorData) Doctors;

    function addDoctor(
        uint256 _doctor_id,
        string memory _hospital,
        string memory _department
    ) public returns (bool) {
        DoctorData memory _doctor;
        _doctor.doctor_address = msg.sender;

        _doctor.doctor_id = _doctor_id;

        _doctor.hospital = _hospital;
        _doctor.department = _department;

        Doctors[msg.sender] = _doctor;
        doctorAddresses.push(msg.sender);

        emit DoctorAdded(_doctor_id, _hospital, _department);

        return true;
    }

    function addPatient(
        uint256 _age,
        uint256 _height,
        uint256 _weight,
        string memory _bloodGroup,
        string memory _gender
    ) public returns (bool) {
        PatientData memory _patient;
        _patient.patient_address = msg.sender;
        _patient.age = _age;

        _patient.height = _height;

        _patient.weight = _weight;
        _patient.bloodGroup = _bloodGroup;

        _patient.gender = _gender;
        _patient.noOfReports = 0;
        Patients[msg.sender] = _patient;
        patientAddresses.push(msg.sender);

        emit PatientAdded(_age, _height, _weight, _bloodGroup, _gender);

        return true;
    }

    function addReport(
        uint256 _report_id,
        string memory _fileHash,
        address _patient_address
    ) public returns (bool) {
        ReportData memory _record;
        _record.report_id = _report_id;
        _record.fileHash = _fileHash;
        _record.doctor = msg.sender;
        _record.patient = _patient_address;

        _record.time = block.timestamp;
        _record.isVisible = false;
        PatientFiles[_patient_address][_report_id] = _record;
        Patients[_patient_address].noOfReports++;
        emit ReportAdded(_fileHash, _patient_address);

        return true;
    }

    function changeVisibilty(
        address _patient_address,
        uint256 _record_id,
        bool _isVisible
    ) public returns (bool) {
        PatientFiles[_patient_address][_record_id].isVisible = _isVisible;

        emit VisibilityChanged(_patient_address, _record_id, _isVisible);
        return true;
    }

    function getAllReports(address _patient_address)
        public
        view
        returns (ReportData[] memory)
    {
        //make it only for doctors and owner
        ReportData[] memory records;
        for (uint256 i = 0; i < Patients[_patient_address].noOfReports; i++) {
            records[i] = PatientFiles[_patient_address][i];
        }

        return records;
    }
}
