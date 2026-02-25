document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const subLinks = document.querySelectorAll('.nav-sub-link');
    const contentFrame = document.getElementById('content-frame');

    let currentLang = 'sc';
    let currentPath = 'pages/usage.html';

    // Navigation logic for main links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parentItem = link.closest('.nav-item');

            if (parentItem.classList.contains('has-submenu')) {
                // Menu is now permanently expanded via CSS
            }

            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            subLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Update iframe src
            currentPath = link.getAttribute('href');
            updateIframe();
        });
    });

    // Navigation logic for sub-links
    subLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            subLinks.forEach(l => l.classList.remove('active'));

            // Add active class to sub-link
            link.classList.add('active');

            // Update iframe src
            currentPath = link.getAttribute('href');
            updateIframe();
        });
    });

    // Language translations for Sidebar
    const translations = {
        sc: {
            usage: '使用前须知',
            list: '活动列表说明',
            'flow-parent': '新增活动流程',
            step1: '• 活动设置',
            step2: '• 活动图片',
            step3: '• 参与对象名单',
            step4: '• 活动条件',
            step5: '• 风控条件',
            step6: '• 领取条件',
            step7: '• 提款条件',
            step8: '• 送出预览',
            templates: '活动模板说明',
            'templates-parent': '活动模板说明',
            'tmpl-continuous': '连续性活动',
            'tmpl-rescue': '救援金',
            'tmpl-treasure': '定期宝箱',
            'tmpl-login': '每天登入',
            'tmpl-reg': '注册礼金',
            'promo-parent': '优惠码设置',
            'promo-intro': '1. 优惠码列表操作说明',
            'promo-restr': '2. 优惠码兑换限制',
            'promo-desc': '3. 优惠码说明设置',
            'promo-flow': '4. 新增优惠码（新增流程）',
            'promo-step1': '5-1. 优惠码设置',
            'promo-step2': '5-2. 参与对象与名单',
            'promo-step3': '5-3. 活动条件',
            'promo-step4': '5-4. 风控设定',
            'promo-step5': '5-5. 领取条件',
            'promo-step6': '5-6. 提款条件',
            'promo-step7': '5-7. 送出预览'
        },
        en: {
            usage: 'Prerequisites',
            list: 'Activity List',
            'flow-parent': 'New Activity Flow',
            step1: '• Activity Settings',
            step2: '• Activity Images',
            step3: '• Participant List',
            step4: '• Activity Conditions',
            step5: '• Risk Control',
            step6: '• Claiming Conditions',
            step7: '• Withdrawal Conditions',
            step8: '• Submit Preview',
            templates: 'Activity Templates',
            'templates-parent': 'Activity Templates',
            'tmpl-continuous': 'Continuous Activity',
            'tmpl-rescue': 'Rescue Fund',
            'tmpl-treasure': 'Treasure Chest',
            'tmpl-login': 'Daily Login',
            'tmpl-reg': 'Registration Bonus',
            'promo-parent': 'Promo Code Settings',
            'promo-intro': '1. Promo Code List Guide',
            'promo-restr': '2. Redemption Limits',
            'promo-desc': '3. Description Settings',
            'promo-flow': '4. New Promo Code Flow',
            'promo-step1': '5-1. Promo Settings',
            'promo-step2': '5-2. Participants',
            'promo-step3': '5-3. Activity Conditions',
            'promo-step4': '5-4. Risk Control',
            'promo-step5': '5-5. Claim Conditions',
            'promo-step6': '5-6. Withdrawal Conditions',
            'promo-step7': '5-7. Submit Preview'
        },
        vn: {
            usage: 'Kiến thức sử dụng',
            list: 'Mô tả danh sách',
            'flow-parent': 'Quy trình mới',
            step1: '• Thiết lập',
            step2: '• Hình ảnh',
            step3: '• Đối tượng',
            step4: '• Điều kiện',
            step5: '• Rủi ro',
            step6: '• Nhận thưởng',
            step7: '• Rút tiền',
            step8: '• Xem trước',
            templates: 'Mẫu hoạt động',
            'templates-parent': 'Mẫu hoạt động',
            'tmpl-continuous': 'Hoạt động liên tục',
            'tmpl-rescue': 'Quỹ cứu trợ',
            'tmpl-treasure': 'Rương kho báu',
            'tmpl-login': 'Đăng nhập hàng ngày',
            'tmpl-reg': 'Tiền thưởng đăng ký',
            'promo-parent': 'Cài đặt mã KM',
            'promo-intro': '1. Hướng dẫn danh sách mã KM',
            'promo-restr': '2. Hạn chế đổi mã',
            'promo-desc': '3. Cài đặt mô tả',
            'promo-flow': '4. Quy trình thêm mã KM mới',
            'promo-step1': '5-1. Cài đặt mã KM',
            'promo-step2': '5-2. Đối tượng',
            'promo-step3': '5-3. Điều kiện',
            'promo-step4': '5-4. Rủi ro',
            'promo-step5': '5-5. Nhận thưởng',
            'promo-step6': '5-6. Rút tiền',
            'promo-step7': '5-7. Xem trước'
        }
    };

    const langDropdown = document.querySelector('.lang-dropdown');
    const langBtn = document.querySelector('.lang-dropbtn');
    const langOptions = document.querySelectorAll('.lang-dropdown-content a');
    const activeLangText = document.querySelector('#active-lang span');

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Language switching logic
    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.dataset.lang;
            currentLang = lang;

            // Update UI
            activeLangText.textContent = opt.textContent;
            translateSidebar(lang);
            updateIframe();

            // Close dropdown
            langDropdown.classList.remove('active');
        });
    });

    function translateSidebar(lang) {
        const trans = translations[lang];
        document.querySelectorAll('[data-id]').forEach(el => {
            const id = el.dataset.id;
            if (trans[id]) {
                const span = el.querySelector('span');
                if (span) {
                    span.textContent = trans[id];
                } else if (el.tagName === 'A' && !el.classList.contains('nav-link')) {
                    // This handles sub-links which might not have spans
                    el.textContent = trans[id];
                } else {
                    // Fallback for parent links or others
                    const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");
                    if (textNode) textNode.textContent = trans[id];
                }
            }
        });
    }

    function updateIframe() {
        // We can pass language as a hash or query param if the sub-pages handle it
        // Or we could have different folders like pages/en/usage.html
        // For simplicity, let's assume sub-pages handle translation via hash or they are separate files
        // The user asked for "separate pages", so maybe pages/usage_sc.html etc.
        // But for better management, sub-pages will receive the language info.

        const timestamp = new Date().getTime(); // Prevent caching during dev
        contentFrame.src = `${currentPath}?lang=${currentLang}&t=${timestamp}`;
    }

    // Initial translation
    translateSidebar(currentLang);
});
