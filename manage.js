document.addEventListener('DOMContentLoaded', function() {
    // หาปุ่มทั้งหมดในตาราง
    const actionButtons = document.querySelectorAll('.action-btn');

    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // หาแถว (tr) ที่ปุ่มนี้อยู่
            const row = this.closest('tr');
            // หา username จากแถวนั้น
            const username = row.querySelector('td:first-child strong').textContent;

            if (this.classList.contains('view')) {
                alert(`กำลังดูข้อมูลของ: ${username}`);
            } else if (this.classList.contains('edit')) {
                alert(`กำลังแก้ไขข้อมูลของ: ${username}`);
            } else if (this.classList.contains('delete')) {
                // เพิ่มการยืนยันก่อนลบ
                if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ ${username}?`)) {
                    alert(`กำลังลบข้อมูลของ: ${username}`);
                    // (ในโค้ดจริง) ตรงนี้จะเป็นการส่ง request ไปที่ server เพื่อลบข้อมูล
                    // row.remove(); // ลบแถวออกจากหน้าจอเพื่อแสดงผลทันที
                }
            }
        });
    });
});