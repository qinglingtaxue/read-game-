// main.js
document.addEventListener('DOMContentLoaded', function() {
    // 山峰点击跳转配置
    const mountainRoutes = {
        'sun': 'sun-mountain.html',
        'moon': 'moon-mountain.html',
        'world': 'world-mountain.html',
        'history': 'history-mountain.html',
        'era': 'times-mountain.html',
        'society': 'society-mountain.html',
        'organization': 'organization-mountain.html',
        'family': 'family-mountain.html',
        'nature': 'humanity-mountain.html',
        'body': 'body-mountain.html',
        'faith': 'beliefs-mountain.html'
    };
    
    // 为所有山峰添加点击事件
    document.querySelectorAll('.mountain').forEach(mountain => {
        const mountainType = mountain.getAttribute('data-mountain');
        
        if (mountainRoutes[mountainType]) {
            mountain.style.cursor = 'pointer';
            mountain.title = `点击进入${mountain.querySelector('.mountain-name').textContent}`;
            
            mountain.addEventListener('click', function() {
                window.location.href = mountainRoutes[mountainType];
            });
        }
    });
});