document.addEventListener('DOMContentLoaded', function () {
    // 1. ข้อมูลบริษัทและสาขา (จากโจทย์)
    const companyData = {
        "บ.ที-วัน สตีล โซลูชั่น จำกัด": {
            "สำนักงานใหญ่": "CEN", "วังน้อย": "WN", "ลพบุรี": "LB", "โคราช": "KR", "เชียงใหม่": "CM", "เชียงราย": "CR", "แม่สาย": "MS", "บ้านโป่ง": "BP", "บูรพา": "BU", "ลำปาง": "LP", "พิษณุโลก": "PL", "กบินทร์บุรี": "KB", "รัตนาธิเบศร์": "RT", "ชัยนาท": "CN", "ฝาง": "FG", "เชียงคำ": "CK", "ท่าแซะ": "TS", "สัตหีบ": "SH", "พนัสนิคม": "PN"
        },
        "บ.วี-สตีล เมทัล ซัพพลาย จำกัด": {
            "ระยอง": "RY", "ยโสธร": "YS", "พิบูลมังสาหาร": "PB", "วังน้อย": "WT", "สุราษฏร์ธานี": "ST", "นครศรีธรรมราช": "NR", "กาฬสินธุ์": "MH", "ปักธงชัย": "PT", "ชัยภูมิ": "CP", "อยุธยา": "AU", "สุรินทร์": "SR", "เลิงนกทา": "LT", "สันป่าตอง": "SP", "สมุทรสาคร": "SM", "แม่สอด": "MT"
        },
        "ห้างหุ้นส่วนจักัด สินชัยกิจพาณิชย์": {
            "เดชอุดม": "UB", "ศรีสะเกษ": "SK", "ขอนแก่น": "KK", "ร้อยเอ็ด": "RE", "สีคิ้ว": "SO"
        },
        "บ.วี-บิวท์ สตีล คอร์ปอเรชั่น จำกัด": {
            "ลำลูกกา": "LK", "เพชรบุรี": "PR", "ชุมพร": "CH", "กระบี่": "KI", "สงขลา": "SL", "วังน้อย": "WM", "บางละมุง": "BL", "แกลง": "KL"
        },
        "บ.แมกซ์ สตีล เซอร์วิส เซ็นเตอร์ จำกัด": {
            "Maxsale": "X", "ลาดหลุมแก้ว": "L", "Max Spacial": "S"
        },
        "บ.Ikonix Trading": {
            "Ikonix": "TR"
        },
        "บ.เจ เอ็น พี แมททีเรียล ซัพพลาย จำกัด": {
            "JNP": "P"
        }
    };

    const companySelect = document.getElementById('company');
    const branchSelect = document.getElementById('branch');
    const branchCodeInput = document.getElementById('branchCode');
    const form = document.getElementById('registerForm');

    // 2. เติมรายชื่อบริษัทใน Dropdown
    for (const companyName in companyData) {
        const option = document.createElement('option');
        option.value = companyName;
        option.textContent = companyName;
        companySelect.appendChild(option);
    }

    // 3. เมื่อเลือกบริษัท ให้เปลี่ยนรายชื่อสาขา
    companySelect.addEventListener('change', function () {
        const selectedCompany = this.value;
        // ล้างค่าเก่า
        branchSelect.innerHTML = '<option value="">--- กรุณาเลือกสาขา ---</option>';
        branchCodeInput.value = '';

        if (selectedCompany) {
            branchSelect.disabled = false;
            const branches = companyData[selectedCompany];
            for (const branchName in branches) {
                const option = document.createElement('option');
                option.value = branchName;
                option.textContent = branchName;
                branchSelect.appendChild(option);
            }
        } else {
            branchSelect.disabled = true;
        }
    });

    // 4. เมื่อเลือกสาขา ให้แสดงรหัสสาขา
    branchSelect.addEventListener('change', function() {
        const selectedCompany = companySelect.value;
        const selectedBranch = this.value;

        if (selectedCompany && selectedBranch) {
            const branchCode = companyData[selectedCompany][selectedBranch];
            branchCodeInput.value = branchCode;
        } else {
             branchCodeInput.value = '';
        }
    });

    // 5. เมื่อกดส่งฟอร์ม (ตัวอย่างการทำงาน)
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
        alert('ลงทะเบียนสำเร็จ!\n(นี่คือตัวอย่าง Frontend เท่านั้น ข้อมูลยังไม่ได้ถูกบันทึก)');
        
        // แสดงข้อมูลที่กรอกใน Console log
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('ข้อมูลที่ส่ง:', data);
    });
});