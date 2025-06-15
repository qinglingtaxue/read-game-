/**
 * 智慧山水图 - 核心数据文件
 * 包含所有山峰、智者、书籍的详细信息
 */

// 主要山峰数据
const MOUNTAINS_DATA = {
    sun: {
        id: 'sun',
        name: '太阳之山',
        description: '文明之源，孕育人类智慧的摇篮',
        subtitle: '人类文明的四大河流在此汇聚',
        layer: 'core',
        color: '#f39c12',
        rivers: [
            { name: '古中国河', culture: '中华文明', representative: '孔子' },
            { name: '古希腊河', culture: '希腊文明', representative: '苏格拉底' },
            { name: '古印度河', culture: '印度文明', representative: '佛陀' },
            { name: '古希伯来河', culture: '希伯来文明', representative: '耶稣' }
        ],
        sages: [
            {
                name: '孔子',
                title: '万世师表',
                period: '春秋时期',
                contribution: '儒家思想创始人',
                quote: '学而时习之，不亦说乎？',
                books: ['论语', '大学', '中庸', '孟子']
            },
            {
                name: '苏格拉底',
                title: '哲学之父',
                period: '古希腊',
                contribution: '西方哲学奠基人',
                quote: '认识你自己',
                books: ['申辩篇', '克里同篇', '斐多篇']
            },
            {
                name: '佛陀',
                title: '觉悟者',
                period: '公元前6世纪',
                contribution: '佛教创始人',
                quote: '一切皆苦，唯有觉悟',
                books: ['金刚经', '心经', '法华经']
            },
            {
                name: '耶稣',
                title: '救世主',
                period: '公元1世纪',
                contribution: '基督教创始人',
                quote: '爱人如己',
                books: ['马太福音', '马可福音', '路加福音', '约翰福音']
            },
            {
                name: '庄子',
                title: '逍遥游者',
                period: '战国时期',
                contribution: '道家思想大师',
                quote: '天地与我并生，万物与我为一',
                books: ['庄子', '逍遥游', '齐物论']
            },
            {
                name: '柏拉图',
                title: '理念世界的探索者',
                period: '古希腊',
                contribution: '理念论创始人',
                quote: '美是难的',
                books: ['理想国', '斐德罗篇', '会饮篇']
            }
        ],
        keyWords: ['文明', '智慧', '源头', '传承']
    },

    moon: {
        id: 'moon',
        name: '月亮之山',
        description: '知识的知识，如月亮般润物无声',
        subtitle: '方法论的殿堂，智慧之光的反射',
        layer: 'core',
        color: '#bdc3c7',
        paths: [
            { name: '笛卡尔信徒山脉', method: '理性主义', focus: '演绎推理' },
            { name: '讲故事的人山脉', method: '叙事思维', focus: '经验传承' },
            { name: '达尔文信徒山脉', method: '进化思维', focus: '适应性学习' }
        ],
        sages: [
            {
                name: '培根',
                title: '科学方法之父',
                period: '文艺复兴',
                contribution: '归纳法，经验主义',
                quote: '知识就是力量',
                books: ['新工具', '学术的进展', '新大西岛']
            },
            {
                name: '笛卡尔',
                title: '现代哲学之父',
                period: '17世纪',
                contribution: '方法论，理性主义',
                quote: '我思故我在',
                books: ['方法论', '第一哲学沉思录', '哲学原理']
            },
            {
                name: '休谟',
                title: '怀疑论大师',
                period: '18世纪',
                contribution: '经验主义，因果关系批判',
                quote: '理性是情感的奴隶',
                books: ['人性论', '人类理解研究', '道德原理研究']
            },
            {
                name: '康德',
                title: '批判哲学创始人',
                period: '18世纪',
                contribution: '先验哲学，三大批判',
                quote: '头上的星空，心中的道德律',
                books: ['纯粹理性批判', '实践理性批判', '判断力批判']
            },
            {
                name: '胡塞尔',
                title: '现象学之父',
                period: '19-20世纪',
                contribution: '现象学方法',
                quote: '回到事物本身',
                books: ['逻辑研究', '现象学的观念', '欧洲科学危机']
            },
            {
                name: '维特根斯坦',
                title: '语言哲学大师',
                period: '20世纪',
                contribution: '语言游戏理论',
                quote: '凡是能够说的事情，都能够说清楚',
                books: ['逻辑哲学论', '哲学研究', '论确实性']
            },
            {
                name: '波兰尼',
                title: '个人知识理论家',
                period: '20世纪',
                contribution: '默会知识理论',
                quote: '我们知道的比我们能说出的更多',
                books: ['个人知识', '默会维度', '科学、信仰与社会']
            }
        ],
        keyWords: ['方法', '认知', '理性', '直觉']
    },

    world: {
        id: 'world',
        name: '世界之山',
        description: '理解世界的奥秘',
        subtitle: '从宇宙洪荒到生命奥秘',
        layer: 'heaven',
        color: '#3498db',
        ranges: [
            { name: '进化论与复杂科学山脉', focus: '生命演化与复杂系统' },
            { name: '宇宙天文山川地理山脉', focus: '宇宙与地球科学' }
        ],
        sages: [
            {
                name: '黑格尔',
                title: '德国古典哲学集大成者',
                period: '18-19世纪',
                contribution: '辩证法，绝对精神论',
                quote: '凡是现实的都是合乎理性的，凡是合乎理性的都是现实的',
                books: ['精神现象学', '逻辑学', '法哲学原理']
            },
            {
                name: '海德格尔',
                title: '存在主义哲学家',
                period: '20世纪',
                contribution: '存在主义，现象学',
                quote: '思就是对存在的思',
                books: ['存在与时间', '论真理的本质', '什么是形而上学']
            },
            {
                name: '萨特',
                title: '法国存在主义代表',
                period: '20世纪',
                contribution: '存在主义，自由与责任',
                quote: '存在先于本质',
                books: ['存在与虚无', '恶心', '墙']
            },
            {
                name: '德威特',
                title: '量子物理学家',
                period: '20世纪',
                contribution: '量子引力理论',
                quote: 'N/A',
                books: ['The Many-Worlds Interpretation of Quantum Mechanics']
            },
            {
                name: '达尔文',
                title: '进化论奠基人',
                period: '19世纪',
                contribution: '自然选择学说',
                quote: '物竞天择，适者生存',
                books: ['物种起源', '人类的由来']
            },
            {
                name: '爱因斯坦',
                title: '物理学巨匠',
                period: '20世纪',
                contribution: '相对论，光电效应',
                quote: '想象力比知识更重要',
                books: ['相对论入门', '我的世界观']
            },
            {
                name: '西蒙',
                title: '人工智能先驱',
                period: '20世纪',
                contribution: '有限理性，人工智能',
                quote: '决策是人类智能的核心',
                books: ['管理行为', '人工智能：复杂信息处理的理论与实践']
            }
        ],
        keyWords: ['文明', '智慧', '源头', '传承']
    },
}