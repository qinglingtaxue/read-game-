/**
 * 模板配置文件
 * 统一管理所有山峰、山脉、智者的配置数据
 * 供所有模板系统使用
 */

/**
 * 山峰配置数据
 * 定义每座山的基本信息、主题样式、包含的山脉等
 */
const MOUNTAIN_CONFIGS = {
    // 核心山 - 太阳山
    'sun': {
        type: 'core',
        title: '太阳山探索之旅',
        theme: 'golden',
        description: '文明之源',
        chineseName: '太阳山',
        background: 'linear-gradient(180deg, #ff6b35 0%, #f7931e 100%)',
        sageCount: 6,
        sages: ['confucius', 'socrates', 'plato', 'buddha', 'jesus', 'zhuangzi'],
        guide: {
            avatar: '🧙‍♂️',
            name: '智慧向导',
            speech: '在天外，有一座太阳之山，太阳山里有一条河，叫文明之河，河水终日川流不息，孕育了人类的文明。'
        }
    },

    // 核心山 - 月亮山
    'moon': {
        type: 'core',
        title: '月亮山探索之旅',
        theme: 'silver',
        description: '方法之光',
        chineseName: '月亮山',
        background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
        sageCount: 7,
        sages: ['bacon', 'descartes', 'hume', 'kant', 'husserl', 'wittgenstein', 'polanyi'],
        guide: {
            avatar: '🌙',
            name: '月亮守护者',
            speech: '月亮之山，我在仰望。月亮之上，有多少知识，在自由的漫步。通往山之巅的路径有三条。'
        }
    },

    // 天之山 - 世界山
    'world': {
        type: 'layered',
        title: '世界山探索之旅',
        theme: 'cosmic',
        description: '理解世界',
        chineseName: '世界山',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        sageCount: 28, // 4个山脉 × 7个智者
        layer: 'heaven',
        ranges: [
            { id: 'evolution', name: '进化论与复杂科学', icon: '🧬', color: '#4CAF50' },
            { id: 'astronomy', name: '宇宙天文山川地理', icon: '🌌', color: '#2196F3' },
            { id: 'physics', name: '物质规律', icon: '⚛️', color: '#FF9800' },
            { id: 'biology', name: '生物奥秘', icon: '🔬', color: '#9C27B0' }
        ],
        guide: {
            avatar: '🌍',
            name: '宇宙使者',
            speech: '在人烟罕至之处，有三座天之山。在世界之山，有四条山脉，探索宇宙与生命的奥秘。'
        }
    },

    // 天之山 - 历史山
    'history': {
        type: 'layered',
        title: '历史山探索之旅',
        theme: 'ancient',
        description: '理解历史',
        chineseName: '历史山',
        background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
        sageCount: 28,
        layer: 'heaven',
        ranges: [
            { id: 'chinese-history', name: '中国通史', icon: '🏛️', color: '#D32F2F' },
            { id: 'world-history', name: '世界通史', icon: '🌍', color: '#1976D2' },
            { id: 'chinese-period', name: '中国断代史与专题', icon: '📜', color: '#F57C00' },
            { id: 'western-period', name: '西方断代史与专题', icon: '🏺', color: '#7B1FA2' }
        ],
        guide: {
            avatar: '📚',
            name: '史学长者',
            speech: '历史之山记录着人类文明的足迹，四条山脉展现着古今中外的智慧传承。'
        }
    },

    // 天之山 - 时代山
    'era': {
        type: 'layered',
        title: '时代山探索之旅',
        theme: 'modern',
        description: '理解时代',
        chineseName: '时代山',
        background: 'linear-gradient(180deg, #2C3E50 0%, #3498DB 100%)',
        sageCount: 28,
        layer: 'heaven',
        ranges: [
            { id: 'direct-violence', name: '直接暴力', icon: '⚔️', color: '#E53935' },
            { id: 'indirect-violence', name: '间接暴力', icon: '🏛️', color: '#FB8C00' },
            { id: 'internet-era', name: '互联时代', icon: '💻', color: '#43A047' },
            { id: 'anti-alienation', name: '对抗异化', icon: '🌱', color: '#8E24AA' }
        ],
        guide: {
            avatar: '⏰',
            name: '时代观察者',
            speech: '时代之山见证着社会变迁，从暴力与权力到科技与人性的永恒博弈。'
        }
    },

    // 地之山 - 社会山
    'society': {
        type: 'layered',
        title: '社会山探索之旅',
        theme: 'social',
        description: '理解社会',
        chineseName: '社会山',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        sageCount: 28,
        layer: 'earth',
        ranges: [
            { id: 'social-exchange', name: '社会交换', icon: '🤝', color: '#2E7D32' },
            { id: 'economic-trade', name: '经济交易', icon: '💰', color: '#F57C00' },
            { id: 'political-game', name: '政治博弈', icon: '🏛️', color: '#1565C0' },
            { id: 'human-diversity', name: '人类的多样性', icon: '🌈', color: '#8E24AA' }
        ],
        guide: {
            avatar: '👥',
            name: '社会学者',
            speech: '在人间繁华处，社会之山展现着人与人之间复杂而精妙的关系网络。'
        }
    },

    // 地之山 - 组织山
    'organization': {
        type: 'layered',
        title: '组织山探索之旅',
        theme: 'corporate',
        description: '理解组织',
        chineseName: '组织山',
        background: 'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',
        sageCount: 28,
        layer: 'earth',
        ranges: [
            { id: 'people-in-org', name: '组织中的人', icon: '👥', color: '#388E3C' },
            { id: 'money-in-org', name: '组织中的钱', icon: '💼', color: '#F57C00' },
            { id: 'affairs-in-org', name: '组织中的事', icon: '📊', color: '#1976D2' },
            { id: 'create-org', name: '创建组织', icon: '🏢', color: '#7B1FA2' }
        ],
        guide: {
            avatar: '💼',
            name: '管理智者',
            speech: '组织之山教导着如何协调人、财、事，创建高效运行的组织体系。'
        }
    },

    // 地之山 - 家庭山
    'family': {
        type: 'layered',
        title: '家庭山探索之旅',
        theme: 'warm',
        description: '理解家庭',
        chineseName: '家庭山',
        background: 'linear-gradient(180deg, #ff9a9e 0%, #fecfef 100%)',
        sageCount: 28,
        layer: 'earth',
        ranges: [
            { id: 'create-family', name: '创建家庭（婚姻与恋爱）', icon: '💕', color: '#E91E63' },
            { id: 'expand-family', name: '扩大家庭（生儿育女）', icon: '👶', color: '#FF9800' },
            { id: 'improve-family', name: '改善家庭（家庭治疗）', icon: '🏠', color: '#4CAF50' },
            { id: 'leave-family', name: '离开家庭（安度晚年）', icon: '🌅', color: '#9C27B0' }
        ],
        guide: {
            avatar: '🏡',
            name: '家庭守护者',
            speech: '家庭之山见证着生命的循环，从相遇相爱到生儿育女，从治疗修复到安度晚年。'
        }
    },

    // 人之山 - 人性山
    'nature': {
        type: 'layered',
        title: '人性山探索之旅',
        theme: 'psychology',
        description: '理解人性',
        chineseName: '人性山',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        sageCount: 28,
        layer: 'human',
        ranges: [
            { id: 'physiological-basis', name: '人性的生理基础', icon: '🧠', color: '#F44336' },
            { id: 'psychological-understanding', name: '人性的心理学理解', icon: '💭', color: '#2196F3' },
            { id: 'linguistic-understanding', name: '人性的语言学', icon: '💬', color: '#4CAF50' },
            { id: 'literary-understanding', name: '人性的文学理解', icon: '📚', color: '#FF9800' }
        ],
        guide: {
            avatar: '🧘',
            name: '心理导师',
            speech: '在人间至暗之处，人性之山探索着人类内心最深层的奥秘与真相。'
        }
    },

    // 人之山 - 身体山
    'body': {
        type: 'layered',
        title: '身体山探索之旅',
        theme: 'health',
        description: '理解身体',
        chineseName: '身体山',
        background: 'linear-gradient(180deg, #56ab2f 0%, #a8e6cf 100%)',
        sageCount: 28,
        layer: 'human',
        ranges: [
            { id: 'physical-health', name: '生理健康', icon: '💪', color: '#4CAF50' },
            { id: 'mental-health', name: '心理健康', icon: '🧘', color: '#2196F3' },
            { id: 'environmental-health', name: '环境健康', icon: '🌿', color: '#8BC34A' },
            { id: 'disease-medical', name: '疾病与医疗', icon: '🏥', color: '#F44336' }
        ],
        guide: {
            avatar: '⚕️',
            name: '医学贤者',
            speech: '身体之山关注着生命的载体，从生理到心理，从环境到医疗的全面健康。'
        }
    },

    // 人之山 - 信仰山
    'faith': {
        type: 'layered',
        title: '信仰山探索之旅',
        theme: 'spiritual',
        description: '理解信仰',
        chineseName: '信仰山',
        background: 'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)',
        sageCount: 28,
        layer: 'human',
        ranges: [
            { id: 'confucian', name: '儒家', icon: '☯️', color: '#8D6E63' },
            { id: 'eastern-religion', name: '东方宗教', icon: '🕉️', color: '#FF9800' },
            { id: 'western-religion', name: '西方宗教', icon: '✝️', color: '#2196F3' },
            { id: 'new-taoism', name: '新道学', icon: '🌸', color: '#E91E63' }
        ],
        guide: {
            avatar: '🙏',
            name: '信仰指引者',
            speech: '信仰之山指引着精神的归宿，汇聚东西方智慧，寻找心灵的究竟安处。'
        }
    }
};

/**
 * 山脉详细配置
 * 每个山脉的具体信息和包含的智者
 */
const RANGE_CONFIGS = {
    // 世界山的山脉
    'evolution': {
        mountainId: 'world',
        name: '进化论与复杂科学山脉',
        description: '探索生命演化的奥秘，理解复杂性科学的深刻洞察',
        icon: '🧬',
        color: '#4CAF50',
        sages: ['darwin', 'dawkins', 'gould', 'dennett', 'wilson', 'watts', 'barabasi']
    },
    'astronomy': {
        mountainId: 'world',
        name: '宇宙天文山川地理山脉',
        description: '仰望星空，从宇宙的宏观视角理解世界的本质',
        icon: '🌌',
        color: '#2196F3',
        sages: ['sagan', 'greene', 'weinberg', 'hawking', 'susskind', 'jeffrey', 'diamond']
    },
    'physics': {
        mountainId: 'world',
        name: '物质规律山脉',
        description: '深入物质的基本规律，发现支撑宇宙运行的根本原理',
        icon: '⚛️',
        color: '#FF9800',
        sages: ['feynman', 'weinberg', 'boyle', 'lavoisier', 'dalton', 'pauling', 'maxwell']
    },
    'biology': {
        mountainId: 'world',
        name: '生物奥秘山脉',
        description: '揭开生命的奥秘，理解生物世界的精妙设计',
        icon: '🔬',
        color: '#9C27B0',
        sages: ['mendel', 'fabre', 'lorenz', 'mayr', 'watson', 'judson', 'odum']
    },

    // 历史山的山脉
    'chinese-history': {
        mountainId: 'history',
        name: '中国通史山脉',
        description: '纵览中华五千年文明，领悟历史的智慧与启示',
        icon: '🏛️',
        color: '#D32F2F',
        sages: ['sima-qian', 'sima-guang', 'lv-simian', 'qian-mu', 'zhang-yinlin', 'bo-lecheng', 'fei-zhengqing']
    },
    'world-history': {
        mountainId: 'history',
        name: '世界通史山脉',
        description: '环顾全球历史进程，理解人类文明的多元发展',
        icon: '🌍',
        color: '#1976D2',
        sages: ['jaspers', 'toynbee', 'stavrianos', 'mcneill', 'christian', 'braudel', 'gombrich']
    },
    'chinese-period': {
        mountainId: 'history',
        name: '中国断代史与专题山脉',
        description: '深入特定历史时期，探索中国历史的细节与专题',
        icon: '📜',
        color: '#F57C00',
        sages: ['chen-yinke', 'yan-gengwang', 'fu-yiling', 'joseph-needham', 'fu-sinian', 'qian-mu2', 'yu-yingshi']
    },
    'western-period': {
        mountainId: 'history',
        name: '西方断代史与专题山脉',
        description: '研究西方历史的关键阶段，理解西方文明的演进',
        icon: '🏺',
        color: '#7B1FA2',
        sages: ['gibbon', 'machiavelli', 'voltaire', 'guizot', 'tocqueville', 'burckhardt', 'ranke']
    }

    // ... 其他山脉配置可以继续添加
};

/**
 * 主题样式配置
 * 定义不同主题的色彩和视觉风格
 */
const THEME_STYLES = {
    'golden': {
        primary: '#FFD700',
        secondary: '#FFA500',
        background: 'linear-gradient(180deg, #ff6b35 0%, #f7931e 100%)',
        text: '#FFFFFF',
        accent: '#FF8C00'
    },
    'silver': {
        primary: '#87CEEB',
        secondary: '#4169E1',
        background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'cosmic': {
        primary: '#4B0082',
        secondary: '#8A2BE2',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'ancient': {
        primary: '#8B4513',
        secondary: '#A0522D',
        background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'modern': {
        primary: '#2C3E50',
        secondary: '#3498DB',
        background: 'linear-gradient(180deg, #2C3E50 0%, #3498DB 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'social': {
        primary: '#667eea',
        secondary: '#764ba2',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'corporate': {
        primary: '#4b6cb7',
        secondary: '#182848',
        background: 'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'warm': {
        primary: '#ff9a9e',
        secondary: '#fecfef',
        background: 'linear-gradient(180deg, #ff9a9e 0%, #fecfef 100%)',
        text: '#333333',
        accent: '#E91E63'
    },
    'psychology': {
        primary: '#667eea',
        secondary: '#764ba2',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        text: '#FFFFFF',
        accent: '#FFD700'
    },
    'health': {
        primary: '#56ab2f',
        secondary: '#a8e6cf',
        background: 'linear-gradient(180deg, #56ab2f 0%, #a8e6cf 100%)',
        text: '#FFFFFF',
        accent: '#4CAF50'
    },
    'spiritual': {
        primary: '#ffecd2',
        secondary: '#fcb69f',
        background: 'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)',
        text: '#333333',
        accent: '#FF9800'
    }
};

/**
 * 智者数据结构示例
 * 定义智者数据的标准格式
 */
const SAGE_DATA_STRUCTURE = {
    id: 'sage_id',                    // 智者唯一标识
    name: '智者姓名',                 // 智者中文姓名
    englishName: 'English Name',      // 智者英文姓名（可选）
    title: '智者称号',                // 简短的称号描述
    avatar: '👤',                     // emoji头像
    specialties: ['专长1', '专长2'],   // 专长领域数组
    era: '所处时代',                  // 历史时期
    works: ['代表作1', '代表作2'],     // 代表作品数组
    quote: '经典名言',                // 一句代表性名言
    introduction: '智者介绍...',       // 详细介绍（100-150字）
    dialogues: [                      // 对话数据数组
        {
            type: 'greeting',         // 对话类型
            id: 'dialog_id',          // 对话唯一标识（可选）
            sage: '智者的话...',       // 智者说的话
            options: [                // 用户选择选项
                {
                    text: '选项文本',  // 选项显示文本
                    next: 'next_id'   // 下一个对话ID
                }
            ]
        }
    ]
};

/**
 * 工具函数
 */
const TemplateUtils = {
    /**
     * 获取山峰配置
     * @param {string} mountainId - 山峰ID
     * @returns {Object} 山峰配置对象
     */
    getMountainConfig(mountainId) {
        return MOUNTAIN_CONFIGS[mountainId] || null;
    },

    /**
     * 获取山脉配置
     * @param {string} rangeId - 山脉ID
     * @returns {Object} 山脉配置对象
     */
    getRangeConfig(rangeId) {
        return RANGE_CONFIGS[rangeId] || null;
    },

    /**
     * 获取主题样式
     * @param {string} theme - 主题名称
     * @returns {Object} 主题样式对象
     */
    getThemeStyle(theme) {
        return THEME_STYLES[theme] || THEME_STYLES['cosmic'];
    },

    /**
     * 获取山峰的所有山脉
     * @param {string} mountainId - 山峰ID
     * @returns {Array} 山脉配置数组
     */
    getMountainRanges(mountainId) {
        const config = this.getMountainConfig(mountainId);
        return config ? config.ranges || [] : [];
    },

    /**
     * 检查是否为核心山（太阳山/月亮山）
     * @param {string} mountainId - 山峰ID
     * @returns {boolean} 是否为核心山
     */
    isCoreMountain(mountainId) {
        const config = this.getMountainConfig(mountainId);
        return config ? config.type === 'core' : false;
    },

    /**
     * 获取山峰层级
     * @param {string} mountainId - 山峰ID
     * @returns {string} 层级名称 ('core', 'heaven', 'earth', 'human')
     */
    getMountainLayer(mountainId) {
        const config = this.getMountainConfig(mountainId);
        if (!config) return 'unknown';
        if (config.type === 'core') return 'core';
        return config.layer || 'unknown';
    }
};

// 导出配置对象（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MOUNTAIN_CONFIGS,
        RANGE_CONFIGS,
        THEME_STYLES,
        SAGE_DATA_STRUCTURE,
        TemplateUtils
    };
}