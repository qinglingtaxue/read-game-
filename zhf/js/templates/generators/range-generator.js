/**
 * 山脉页面生成器
 * 负责生成山脉页面的HTML内容和智者卡片
 */

class RangePageGenerator {
    /**
     * 生成完整的山脉页面HTML
     * @param {string} mountainId - 山峰ID (如: 'world', 'history')
     * @param {string} rangeId - 山脉ID (如: 'evolution', 'astronomy')
     * @param {Array} sageData - 智者数据数组
     * @returns {string} 完整的HTML字符串
     */
    static generate(mountainId, rangeId, sageData) {
        const container = document.createElement('div');
        container.innerHTML = `
            <button class="back-btn" onclick="goBack()">← 返回${this.getMountainName(mountainId)}</button>
            
            <div class="progress-display">
                <span class="range-progress">${this.getRangeName(rangeId)}进度：<span id="range-progress">0/7</span></span>
                <span class="total-progress">总进度：<span id="total-progress">0/420</span></span>
            </div>
            
            <div class="range-scene">
                <div class="range-title">
                    <h1>${this.getRangeName(rangeId)}</h1>
                    <p>${this.getRangeDescription(rangeId)}</p>
                </div>
                
                <div class="sages-in-range">
                    ${sageData.map(sage => this.generateSageCard(sage, mountainId, rangeId)).join('')}
                </div>
            </div>
        `;
        return container.innerHTML;
    }

    /**
     * 生成单个智者卡片
     * @param {Object} sage - 智者数据对象
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @returns {string} 智者卡片HTML
     */
    static generateSageCard(sage, mountainId, rangeId) {
        return `
            <div class="sage-card" data-sage="${sage.id}" onclick="visitSage('${mountainId}', '${rangeId}', '${sage.id}')">
                <div class="sage-avatar-large">${sage.avatar}</div>
                <div class="sage-name-large">${sage.name}</div>
                <div class="sage-title">${sage.title}</div>
                <div class="sage-era">${sage.era}</div>
                <div class="sage-quote">"${sage.quote}"</div>
            </div>
        `;
    }

    /**
     * 根据山峰ID获取山峰中文名称
     * @param {string} mountainId - 山峰ID
     * @returns {string} 山峰中文名称
     */
    static getMountainName(mountainId) {
        const names = {
            'world': '世界山',
            'history': '历史山',
            'era': '时代山',
            'society': '社会山',
            'organization': '组织山',
            'family': '家庭山',
            'nature': '人性山',
            'body': '身体山',
            'faith': '信仰山'
        };
        return names[mountainId] || '未知山';
    }

    /**
     * 根据山脉ID获取山脉中文名称
     * @param {string} rangeId - 山脉ID
     * @returns {string} 山脉中文名称
     */
    static getRangeName(rangeId) {
        const names = {
            // 世界山的山脉
            'evolution': '进化论与复杂科学山脉',
            'astronomy': '宇宙天文山川地理山脉',
            'physics': '物质规律山脉',
            'biology': '生物奥秘山脉',
            
            // 历史山的山脉
            'chinese-history': '中国通史山脉',
            'world-history': '世界通史山脉',
            'chinese-period': '中国断代史与专题山脉',
            'western-period': '西方断代史与专题山脉',
            
            // 时代山的山脉
            'direct-violence': '直接暴力山脉',
            'indirect-violence': '间接暴力山脉',
            'internet-era': '互联时代山脉',
            'anti-alienation': '对抗异化山脉',
            
            // 社会山的山脉
            'social-exchange': '社会交换山脉',
            'economic-trade': '经济交易山脉',
            'political-game': '政治博弈山脉',
            'human-diversity': '人类的多样性山脉',
            
            // 组织山的山脉
            'people-in-org': '组织中的人山脉',
            'money-in-org': '组织中的钱山脉',
            'affairs-in-org': '组织中的事山脉',
            'create-org': '创建组织山脉',
            
            // 家庭山的山脉
            'create-family': '创建家庭（婚姻与恋爱）山脉',
            'expand-family': '扩大家庭（生儿育女）山脉',
            'improve-family': '改善家庭（家庭治疗）山脉',
            'leave-family': '离开家庭（安度晚年）山脉',
            
            // 人性山的山脉
            'physiological-basis': '人性的生理基础山脉',
            'psychological-understanding': '人性的心理学理解山脉',
            'linguistic-understanding': '人性的语言学山脉',
            'literary-understanding': '人性的文学理解山脉',
            
            // 身体山的山脉
            'physical-health': '生理健康山脉',
            'mental-health': '心理健康山脉',
            'environmental-health': '环境健康山脉',
            'disease-medical': '疾病与医疗山脉',
            
            // 信仰山的山脉
            'confucian': '儒家山脉',
            'eastern-religion': '东方宗教山脉',
            'western-religion': '西方宗教山脉',
            'new-taoism': '新道学山脉'
        };
        return names[rangeId] || '智慧山脉';
    }

    /**
     * 根据山脉ID获取山脉描述
     * @param {string} rangeId - 山脉ID
     * @returns {string} 山脉描述
     */
    static getRangeDescription(rangeId) {
        const descriptions = {
            'evolution': '探索生命演化的奥秘，理解复杂性科学的深刻洞察',
            'astronomy': '仰望星空，从宇宙的宏观视角理解世界的本质',
            'physics': '深入物质的基本规律，发现支撑宇宙运行的根本原理',
            'biology': '揭开生命的奥秘，理解生物世界的精妙设计',
            
            'chinese-history': '纵览中华五千年文明，领悟历史的智慧与启示',
            'world-history': '环顾全球历史进程，理解人类文明的多元发展',
            'chinese-period': '深入特定历史时期，探索中国历史的细节与专题',
            'western-period': '研究西方历史的关键阶段，理解西方文明的演进',
            
            // 可以继续添加更多描述...
        };
        return descriptions[rangeId] || '这里聚集了该领域最杰出的7位智者，等待与你分享他们的智慧。';
    }

    /**
     * 生成山脉页面的完整HTML模板
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @returns {string} 完整的HTML页面
     */
    static generateFullPageTemplate(mountainId, rangeId) {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.getRangeName(rangeId)} - ${this.getMountainName(mountainId)}</title>
    <link rel="stylesheet" href="../../css/range.css">
</head>
<body>
    <button class="back-btn" onclick="goBack()">← 返回${this.getMountainName(mountainId)}</button>
    
    <div class="progress-display">
        <span class="range-progress">${this.getRangeName(rangeId)}进度：<span id="range-progress">0/7</span></span>
        <span class="total-progress">总进度：<span id="total-progress">0/420</span></span>
    </div>
    
    <div class="range-scene">
        <div class="range-title">
            <h1>${this.getRangeName(rangeId)}</h1>
            <p>${this.getRangeDescription(rangeId)}</p>
        </div>
        
        <div class="sages-in-range" id="sages-container">
            <!-- 智者卡片将通过JavaScript动态加载 -->
        </div>
    </div>

    <!-- 脚本文件 -->
    <script src="../../js/templates/range-generator.js"></script>
    <script src="../../js/templates/dialog-generator.js"></script>
    <script src="../../js/navigation.js"></script>
    <script src="../../js/progress.js"></script>
    
    <script>
        // 页面初始化
        document.addEventListener('DOMContentLoaded', function() {
            window.CURRENT_MOUNTAIN = '${mountainId}';
            window.CURRENT_RANGE = '${rangeId}';
            initRangePage();
        });
    </script>
</body>
</html>
        `;
    }

    /**
     * 初始化山脉页面
     * 加载智者数据并渲染页面
     */
    static async initializePage() {
        try {
            // 从URL解析山脉信息
            const pathParts = window.location.pathname.split('/');
            const mountainId = pathParts[pathParts.length - 2];
            const rangeFile = pathParts[pathParts.length - 1];
            const rangeId = rangeFile.replace('-range.html', '');
            
            window.CURRENT_MOUNTAIN = mountainId;
            window.CURRENT_RANGE = rangeId;
            
            // 加载智者数据
            const sages = await this.loadSageData(mountainId, rangeId);
            
            // 渲染智者卡片
            const container = document.getElementById('sages-container');
            if (container) {
                container.innerHTML = sages.map(sage => 
                    this.generateSageCard(sage, mountainId, rangeId)
                ).join('');
            }
            
            // 更新进度显示
            this.updateProgressDisplay(mountainId, rangeId);
            
            // 标记已访问的智者
            this.markVisitedSages(mountainId, rangeId, sages);
            
        } catch (error) {
            console.error('初始化山脉页面失败:', error);
        }
    }

    /**
     * 加载智者数据
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @returns {Array} 智者数据数组
     */
    static async loadSageData(mountainId, rangeId) {
        try {
            const response = await fetch(`../../data/${mountainId}/${rangeId}-sages.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('加载智者数据失败:', error);
            return this.getFallbackSageData(rangeId);
        }
    }

    /**
     * 获取备用智者数据（当加载失败时使用）
     * @param {string} rangeId - 山脉ID
     * @returns {Array} 备用智者数据
     */
    static getFallbackSageData(rangeId) {
        return Array.from({length: 7}, (_, index) => ({
            id: `sage${index + 1}`,
            name: `智者${index + 1}`,
            title: '学者',
            avatar: '👨‍🏫',
            era: '古代',
            works: ['著作一', '著作二'],
            quote: '智慧的名言',
            dialogues: [{
                type: 'greeting',
                sage: '欢迎，年轻的求学者。',
                options: [
                    { text: '请教您的思想', next: 'teaching' },
                    { text: '告别', next: 'farewell' }
                ]
            }]
        }));
    }

    /**
     * 更新进度显示
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     */
    static updateProgressDisplay(mountainId, rangeId) {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        
        // 更新总进度
        const totalProgressEl = document.getElementById('total-progress');
        if (totalProgressEl) {
            totalProgressEl.textContent = `${visitedSages.length}/420`;
        }

        // 更新当前山脉进度
        const rangeProgressEl = document.getElementById('range-progress');
        if (rangeProgressEl) {
            const rangeKey = `${mountainId}-${rangeId}`;
            const rangeCompleted = visitedSages.filter(sage => sage.startsWith(rangeKey)).length;
            rangeProgressEl.textContent = `${rangeCompleted}/7`;
        }
    }

    /**
     * 标记已访问的智者
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @param {Array} sages - 智者数据数组
     */
    static markVisitedSages(mountainId, rangeId, sages) {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        
        sages.forEach(sage => {
            const sageKey = `${mountainId}-${rangeId}-${sage.id}`;
            if (visitedSages.includes(sageKey)) {
                const sageCard = document.querySelector(`[data-sage="${sage.id}"]`);
                if (sageCard) {
                    sageCard.classList.add('visited');
                }
            }
        });
    }
}

// 全局函数（供HTML调用）
function initRangePage() {
    RangePageGenerator.initializePage();
}

function visitSage(mountainId, rangeId, sageId) {
    window.location.href = `../../sages/${mountainId}/${rangeId}/${sageId}.html`;
}

// 导出类（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RangePageGenerator;
}