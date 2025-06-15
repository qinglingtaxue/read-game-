// mountain-template-generator.js
// 用于生成各种山峰页面的模板系统

const MOUNTAIN_TEMPLATES = {
    // 核心山（太阳山、月亮山）- 直接展示智者
    'core': {
        sageCount: (mountain) => mountain === 'sun' ? 6 : 7,
        layout: 'direct-sages',
        hasRanges: false
    },
    
    // 天地人三层山 - 有四个山脉
    'layered': {
        sageCount: () => 28, // 4个山脉 × 7个智者
        layout: 'four-ranges',
        hasRanges: true,
        rangeCount: 4
    }
};

// 山峰数据配置
const MOUNTAIN_CONFIG = {
    // 核心山
    'sun': {
        type: 'core',
        title: '太阳山探索之旅',
        theme: 'golden',
        description: '文明之源',
        background: 'linear-gradient(180deg, #ff6b35 0%, #f7931e 100%)',
        sages: ['confucius', 'socrates', 'plato', 'buddha', 'jesus', 'zhuangzi']
    },
    
    'moon': {
        type: 'core',
        title: '月亮山探索之旅',
        theme: 'silver',
        description: '方法之光',
        background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
        sages: ['bacon', 'descartes', 'hume', 'kant', 'husserl', 'wittgenstein', 'polanyi']
    },
    
    // 天之山
    'world': {
        type: 'layered',
        title: '世界山探索之旅',
        theme: 'cosmic',
        description: '理解世界',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        ranges: [
            { id: 'evolution', name: '进化论与复杂科学', icon: '🧬' },
            { id: 'astronomy', name: '宇宙天文山川地理', icon: '🌌' },
            { id: 'physics', name: '物质规律', icon: '⚛️' },
            { id: 'biology', name: '生物奥秘', icon: '🔬' }
        ]
    },
    
    'history': {
        type: 'layered',
        title: '历史山探索之旅',
        theme: 'ancient',
        description: '理解历史',
        background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
        ranges: [
            { id: 'chinese-history', name: '中国通史', icon: '🏛️' },
            { id: 'world-history', name: '世界通史', icon: '🌍' },
            { id: 'chinese-period', name: '中国断代史与专题', icon: '📜' },
            { id: 'western-period', name: '西方断代史与专题', icon: '🏺' }
        ]
    },
    
    'era': {
        type: 'layered',
        title: '时代山探索之旅',
        theme: 'modern',
        description: '理解时代',
        background: 'linear-gradient(180deg, #2C3E50 0%, #3498DB 100%)',
        ranges: [
            { id: 'direct-violence', name: '直接暴力', icon: '⚔️' },
            { id: 'indirect-violence', name: '间接暴力', icon: '🏛️' },
            { id: 'internet-era', name: '互联时代', icon: '💻' },
            { id: 'anti-alienation', name: '对抗异化', icon: '🌱' }
        ]
    },
    
    // 地之山
    'society': {
        type: 'layered',
        title: '社会山探索之旅',
        theme: 'social',
        description: '理解社会',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        ranges: [
            { id: 'social-exchange', name: '社会交换', icon: '🤝' },
            { id: 'economic-trade', name: '经济交易', icon: '💰' },
            { id: 'political-game', name: '政治博弈', icon: '🏛️' },
            { id: 'human-diversity', name: '人类的多样性', icon: '🌈' }
        ]
    },
    
    'organization': {
        type: 'layered',
        title: '组织山探索之旅',
        theme: 'corporate',
        description: '理解组织',
        background: 'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',
        ranges: [
            { id: 'people-in-org', name: '组织中的人', icon: '👥' },
            { id: 'money-in-org', name: '组织中的钱', icon: '💼' },
            { id: 'affairs-in-org', name: '组织中的事', icon: '📊' },
            { id: 'create-org', name: '创建组织', icon: '🏢' }
        ]
    },
    
    'family': {
        type: 'layered',
        title: '家庭山探索之旅',
        theme: 'warm',
        description: '理解家庭',
        background: 'linear-gradient(180deg, #ff9a9e 0%, #fecfef 100%)',
        ranges: [
            { id: 'create-family', name: '创建家庭（婚姻与恋爱）', icon: '💕' },
            { id: 'expand-family', name: '扩大家庭（生儿育女）', icon: '👶' },
            { id: 'improve-family', name: '改善家庭（家庭治疗）', icon: '🏠' },
            { id: 'leave-family', name: '离开家庭（安度晚年）', icon: '🌅' }
        ]
    },
    
    // 人之山
    'nature': {
        type: 'layered',
        title: '人性山探索之旅',
        theme: 'psychology',
        description: '理解人性',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        ranges: [
            { id: 'physiological-basis', name: '人性的生理基础', icon: '🧠' },
            { id: 'psychological-understanding', name: '人性的心理学理解', icon: '💭' },
            { id: 'linguistic-understanding', name: '人性的语言学', icon: '💬' },
            { id: 'literary-understanding', name: '人性的文学理解', icon: '📚' }
        ]
    },
    
    'body': {
        type: 'layered',
        title: '身体山探索之旅',
        theme: 'health',
        description: '理解身体',
        background: 'linear-gradient(180deg, #56ab2f 0%, #a8e6cf 100%)',
        ranges: [
            { id: 'physical-health', name: '生理健康', icon: '💪' },
            { id: 'mental-health', name: '心理健康', icon: '🧘' },
            { id: 'environmental-health', name: '环境健康', icon: '🌿' },
            { id: 'disease-medical', name: '疾病与医疗', icon: '🏥' }
        ]
    },
    
    'faith': {
        type: 'layered',
        title: '信仰山探索之旅',
        theme: 'spiritual',
        description: '理解信仰',
        background: 'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)',
        ranges: [
            { id: 'confucian', name: '儒家', icon: '☯️' },
            { id: 'eastern-religion', name: '东方宗教', icon: '🕉️' },
            { id: 'western-religion', name: '西方宗教', icon: '✝️' },
            { id: 'new-taoism', name: '新道学', icon: '🌸' }
        ]
    }
};

// 智者数据样例结构
const SAGE_DATA_STRUCTURE = {
    id: 'confucius',
    name: '孔子',
    title: '万世师表',
    avatar: '👨‍🏫',
    specialties: ['教育', '政治', '伦理'],
    era: '春秋时期',
    works: ['论语', '春秋', '诗经'],
    quote: '学而时习之，不亦说乎？',
    introduction: '孔子是中国古代伟大的思想家、教育家，儒家学派创始人。他提出"仁"的思想，主张以仁治国，以德化民。',
    dialogues: [
        {
            type: 'greeting',
            sage: '学而时习之，不亦说乎？我是孔子，很高兴见到你这位求学者。',
            options: [
                { text: '请教关于"仁"的思想', next: 'about_ren' },
                { text: '如何做一个君子？', next: 'about_junzi' },
                { text: '教育的意义是什么？', next: 'about_education' }
            ]
        },
        {
            id: 'about_ren',
            sage: '仁者爱人。仁是人与人之间最美好的情感，是社会和谐的根本。',
            options: [
                { text: '如何培养仁心？', next: 'cultivate_ren' },
                { text: '仁政是什么？', next: 'benevolent_government' }
            ]
        }
        // ... 更多对话分支
    ]
};

// HTML模板生成器
class MountainTemplateGenerator {
    static generateCoreMountainHTML(mountainId) {
        const config = MOUNTAIN_CONFIG[mountainId];
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <link rel="stylesheet" href="css/${mountainId}-mountain.css">
</head>
<body>
    <button class="back-btn" onclick="goBack()">← 返回选择</button>

    <!-- 进度显示 -->
    <div class="progress-display">
        <span class="mountain-progress">${config.title.replace('探索之旅', '')}进度：<span id="mountain-progress">0/${config.sages.length}</span></span>
        <span class="total-progress">总进度：<span id="total-progress">0/420</span></span>
    </div>
    
    <div class="mountain-scene" style="background: ${config.background};">
        ${this.generateMountainDecoration(mountainId)}
        
        <!-- 智者们 -->
        <div class="sages-container">
            ${config.sages.map((sage, index) => this.generateSageElement(sage, index, config.sages.length)).join('')}
        </div>
        
        <!-- 导游对话 -->
        ${this.generateGuideSection(mountainId)}

        <!-- 探索提示 -->
        <div class="exploration-hint">
            👥 点击智者开始对话
        </div>
    </div>

    ${this.generateScripts(mountainId, config)}
</body>
</html>`;
    }

    static generateLayeredMountainHTML(mountainId) {
        const config = MOUNTAIN_CONFIG[mountainId];
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <link rel="stylesheet" href="css/${mountainId}-mountain.css">
</head>
<body>
    <button class="back-btn" onclick="goBack()">← 返回选择</button>

    <!-- 进度显示 -->
    <div class="progress-display">
        <span class="mountain-progress">${config.title.replace('探索之旅', '')}进度：<span id="mountain-progress">0/28</span></span>
        <span class="total-progress">总进度：<span id="total-progress">0/420</span></span>
    </div>
    
    <div class="mountain-scene" style="background: ${config.background};">
        ${this.generateMountainDecoration(mountainId)}
        
        <!-- 四个山脉 -->
        <div class="mountain-ranges">
            ${config.ranges.map((range, index) => this.generateRangeElement(range, index, mountainId)).join('')}
        </div>
        
        <!-- 导游对话 -->
        ${this.generateGuideSection(mountainId)}

        <!-- 探索提示 -->
        <div class="exploration-hint">
            🏔️ 点击山脉进入探索
        </div>
    </div>

    ${this.generateScripts(mountainId, config)}
</body>
</html>`;
    }

    static generateSageElement(sageId, index, total) {
        const positions = this.calculateSagePositions(total);
        const pos = positions[index];
        
        return `
            <div class="sage-figure sage-${sageId}" data-sage="${sageId}" onclick="exploreSage('${sageId}')"
                 style="top: ${pos.top}%; left: ${pos.left}%;">
                <div class="sage-avatar" id="avatar-${sageId}">👤</div>
                <div class="sage-name" id="name-${sageId}">加载中...</div>
                <div class="sage-specialty" id="specialty-${sageId}"></div>
            </div>`;
    }

    static generateRangeElement(range, index, mountainId) {
        const positions = [
            { top: 30, left: 20 },
            { top: 30, right: 20 },
            { top: 60, left: 20 },
            { top: 60, right: 20 }
        ];
        const pos = positions[index];
        
        return `
            <div class="range-card" onclick="exploreRange('${mountainId}', '${range.id}')"
                 style="top: ${pos.top}%; ${pos.left ? `left: ${pos.left}%` : `right: ${pos.right}%`};">
                <div class="range-icon">${range.icon}</div>
                <div class="range-name">${range.name}</div>
                <div class="range-progress" id="progress-${range.id}">0/7</div>
            </div>`;
    }

    static calculateSagePositions(count) {
        // 根据智者数量计算合适的位置分布
        if (count === 6) {
            return [
                { top: 35, left: 15 },
                { top: 45, left: 25 },
                { top: 30, left: 35 },
                { top: 40, left: 45 },
                { top: 35, left: 65 },
                { top: 50, left: 75 }
            ];
        } else if (count === 7) {
            return [
                { top: 40, left: 15 },
                { top: 50, left: 25 },
                { top: 35, left: 35 },
                { top: 45, left: 45 },
                { top: 40, left: 55 },
                { top: 55, left: 65 },
                { top: 35, left: 75 }
            ];
        }
        return [];
    }

    static generateMountainDecoration(mountainId) {
        const decorations = {
            'sun': '<div class="sun"></div><div class="sun-rays"></div>',
            'moon': '<div class="moon"><div class="moon-crater crater1"></div><div class="moon-crater crater2"></div></div><div class="stars"></div>',
            'world': '<div class="cosmos-bg"></div><div class="planets"></div>',
            'history': '<div class="ancient-ruins"></div><div class="scrolls"></div>',
            'era': '<div class="modern-skyline"></div><div class="digital-grid"></div>',
            'society': '<div class="city-silhouette"></div><div class="social-networks"></div>',
            'organization': '<div class="corporate-towers"></div><div class="org-chart"></div>',
            'family': '<div class="home-warmth"></div><div class="family-tree"></div>',
            'nature': '<div class="brain-neurons"></div><div class="psychology-symbols"></div>',
            'body': '<div class="health-aura"></div><div class="medical-symbols"></div>',
            'faith': '<div class="spiritual-light"></div><div class="sacred-symbols"></div>'
        };
        return decorations[mountainId] || '';
    }

    static generateGuideSection(mountainId) {
        const guides = {
            'sun': { avatar: '🧙‍♂️', name: '智慧向导', text: '在天外，有一座太阳之山...' },
            'moon': { avatar: '🌙', name: '月亮守护者', text: '月亮之山，我在仰望...' },
            'world': { avatar: '🌍', name: '宇宙使者', text: '在人烟罕至之处，有世界之山...' },
            // ... 其他山峰的导游
        };
        
        const guide = guides[mountainId] || { avatar: '🧙‍♂️', name: '智慧向导', text: '欢迎来到智慧之山...' };
        
        return `
            <div class="guide-section">
                <div class="guide-character">
                    <div class="guide-avatar">${guide.avatar}</div>
                    <div class="guide-name">${guide.name}</div>
                </div>
                <div class="speech-bubble">
                    <div class="bubble-content">
                        <p>${guide.text}</p>
                    </div>
                    <div class="bubble-tail"></div>
                </div>
            </div>`;
    }

    static generateScripts(mountainId, config) {
        return `
    <script>
        const MOUNTAIN_ID = '${mountainId}';
        const MOUNTAIN_CONFIG = ${JSON.stringify(config)};
        
        // 返回全景图
        function goBack() {
            window.location.href = 'index.html';
        }

        // 拜访智者
        function exploreSage(sageId) {
            window.location.href = \`sages/\${MOUNTAIN_ID}/\${sageId}.html\`;
        }

        // 探索山脉
        function exploreRange(mountainId, rangeId) {
            window.location.href = \`ranges/\${mountainId}/\${rangeId}-range.html\`;
        }

        // 加载智者数据
        async function loadSageData() {
            try {
                const response = await fetch(\`data/\${MOUNTAIN_ID}-sages.json\`);
                const sages = await response.json();
                
                sages.forEach(sage => {
                    const avatarEl = document.getElementById(\`avatar-\${sage.id}\`);
                    const nameEl = document.getElementById(\`name-\${sage.id}\`);
                    const specialtyEl = document.getElementById(\`specialty-\${sage.id}\`);
                    
                    if (avatarEl) avatarEl.textContent = sage.avatar;
                    if (nameEl) nameEl.textContent = sage.name;
                    if (specialtyEl) specialtyEl.textContent = sage.title;
                });
            } catch (error) {
                console.log('加载智者数据失败');
            }
        }

        // 检查完成状态
        function checkProgress() {
            const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
            const mountainSages = MOUNTAIN_CONFIG.sages || [];
            const completedCount = mountainSages.filter(sage => 
                visitedSages.includes(\`\${MOUNTAIN_ID}-\${sage}\`)).length;
            
            document.getElementById('mountain-progress').textContent = 
                \`\${completedCount}/\${mountainSages.length}\`;
            document.getElementById('total-progress').textContent = 
                \`\${visitedSages.length}/420\`;
            
            // 更新智者状态显示
            mountainSages.forEach(sage => {
                const sageElement = document.querySelector(\`[data-sage="\${sage}"]\`);
                if (visitedSages.includes(\`\${MOUNTAIN_ID}-\${sage}\`)) {
                    sageElement.classList.add('visited');
                }
            });
        }

        // 页面加载时执行
        window.addEventListener('load', () => {
            loadSageData();
            checkProgress();
        });
    </script>`;
    }
}

// 使用示例：
// 生成月亮山页面：MountainTemplateGenerator.generateCoreMountainHTML('moon')
// 生成世界山页面：MountainTemplateGenerator.generateLayeredMountainHTML('world')

module.exports = { MountainTemplateGenerator, MOUNTAIN_CONFIG, SAGE_DATA_STRUCTURE };