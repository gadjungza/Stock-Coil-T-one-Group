// รอให้หน้าเว็บโหลดเสร็จก่อนเริ่มทำงาน
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers(); // เรียกฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ทันที
});

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก API
function fetchUsers() {
    fetch('api_get_users.php')
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                populateTable(result.data); // ถ้าสำเร็จ ให้นำข้อมูลไปสร้างตาราง
            } else {
                console.error('Failed to fetch users:', result.message);
                alert('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        });
}

// ฟังก์ชันสำหรับสร้างตารางจากข้อมูลที่ได้รับ
function populateTable(users) {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = ''; // ล้างข้อมูลเก่าในตารางทิ้งก่อน

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">ยังไม่มีข้อมูลผู้ใช้งานในระบบ</td></tr>';
        return;
    }

    users.forEach(user => {
        // สร้างแถวใหม่ (tr)
        const row = document.createElement('tr');

        // กำหนด class ให้กับ span ของ role
        const roleClass = user.user_role.toLowerCase() === 'admin' ? 'admin' : 'branch';

        // สร้าง HTML สำหรับแถว
        row.innerHTML = `
            <td><strong>${user.username}</strong></td>
            <td>${user.fullname}</td>
            <td>${user.company}</td>
            <td>${user.branch}</td>
            <td>${user.branch_code}</td>
            <td><span class="role ${roleClass}">${user.user_role}</span></td>
            <td>
                <button class="action-btn view" title="ดูข้อมูล">👁️</button>
                <button class="action-btn edit" title="แก้ไข">✏️</button>
                <button class="action-btn delete" title="ลบ">🗑️</button>
            </td>
        `;
        
        // เพิ่มแถวใหม่เข้าไปในตาราง
        tableBody.appendChild(row);
    });
}