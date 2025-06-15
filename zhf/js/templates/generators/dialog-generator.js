/**
 * 智者对话生成器
 * 负责生成智者对话页面和管理对话流程
 */

class SageDialogGenerator {
    /**
     * 生成智者对话页面的HTML内容
     * @param {Object} sageData - 智者数据对象
     * @returns {string} 对话页面HTML
     */
    static generate(sageData) {
        return `
            <button class="back-btn" onclick="goBack()">← 返回山脉</button>
            
            <div class="dialog-container">
                <div class="sage-header">
                    <div class="sage-portrait">${sageData.avatar}</div>
                    <div class="sage-info">
                        <h1>${sageData.name}</h1>
                        <div class="sage-subtitle">${sageData.title} · ${sageData.era}</div>
                        <div class="sage-works">
                            ${sageData.works.map(work => `<span class="work-tag">${work}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="dialog-area">
                    <div class="sage-message">
                        <div class="speaker">${sageData.name}</div>
                        <div class="content" id="dialog-content">${sageData.dialogues[0].sage}</div>
                    </div>
                    
                    <div class="options-container" id="options-container">
                        ${this.generateOptions(sageData.dialogues[0].options)}
                    </div>
                </div>
                
                <div class="nav-buttons">
                    <button class="nav-btn btn-back" onclick="goBack()">返回山脉</button>
                    <button class="nav-btn btn-next" onclick="nextSage()" id="next-btn" style="display: none;">下一位智者</button>
                    <button class="nav-btn btn-complete" onclick="completeRange()" id="complete-btn" style="display: none;">完成山脉</button>
                </div>
            </div>
        `;
    }

    /**
     * 生成对话选项按钮
     * @param {Array} options - 对话选项数组
     * @returns {string} 选项按钮HTML
     */
    static generateOptions(options) {
        if (!options || options.length === 0) {
            return '';
        }
        
        return options.map(option => 
            `<button class="option-btn" onclick="selectOption('${option.next}')">${option.text}</button>`
        ).join('');
    }

    /**
     * 更新对话内容
     * @param {Object} dialogData - 新的对话数据
     */
    static updateDialog(dialogData) {
        const contentEl = document.getElementById('dialog-content');
        const containerEl = document.getElementById('options-container');
        
        if (contentEl) {
            contentEl.textContent = dialogData.sage;
        }
        
        if (containerEl) {
            if (dialogData.options && dialogData.options.length > 0) {
                containerEl.innerHTML = this.generateOptions(dialogData.options);
            } else {
                // 对话结束
                containerEl.innerHTML = `
                    <div class="completion-message">
                        <h3>🎉 对话完成！</h3>
                        <p>你已经与这位智者进行了深入的对话，获得了宝贵的智慧。</p>
                    </div>
                `;
                this.showCompletionButtons();
            }
        }
    }

    /**
     * 显示完成按钮
     */
    static showCompletionButtons() {
        const nextBtn = document.getElementById('next-btn');
        const completeBtn = document.getElementById('complete-btn');
        
        // 检查是否还有其他智者未拜访
        const currentProgress = this.getCurrentRangeProgress();
        if (currentProgress.completed < 7) {
            if (nextBtn) nextBtn.style.display = 'block';
        } else {
            if (completeBtn) completeBtn.style.display = 'block';
        }
    }

    /**
     * 获取当前山脉的进度
     * @returns {Object} 包含完成数量和总数的对象
     */
    static getCurrentRangeProgress() {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        const currentMountain = window.CURRENT_MOUNTAIN || 'world';
        const currentRange = window.CURRENT_RANGE || 'evolution';
        
        const rangeKey = `${currentMountain}-${currentRange}`;
        const completed = visitedSages.filter(sage => sage.startsWith(rangeKey)).length;
        
        return { completed, total: 7 };
    }

    /**
     * 生成完整的智者对话页面模板
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID  
     * @param {string} sageId - 智者ID
     * @returns {string} 完整的HTML页面
     */
    static generateFullPageTemplate(mountainId, rangeId, sageId) {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${sageId} - 智者对话</title>
    <link rel="stylesheet" href="../../../css/sage.css">
</head>
<body>
    <div id="dialog-content-container">
        <!-- 对话内容将通过JavaScript动态加载 -->
    </div>

    <!-- 脚本文件 -->
    <script src="../../../js/templates/dialog-generator.js"></script>
    <script src="../../../js/navigation.js"></script>
    <script src="../../../js/progress.js"></script>
    
    <script>
        // 页面初始化
        document.addEventListener('DOMContentLoaded', function() {
            window.CURRENT_MOUNTAIN = '${mountainId}';
            window.CURRENT_RANGE = '${rangeId}';
            window.CURRENT_SAGE = '${sageId}';
            initSagePage();
        });
    </script>
</body>
</html>
        `;
    }

    /**
     * 初始化智者对话页面
     */
    static async initializePage() {
        try {
            // 从URL或全局变量获取智者信息
            const mountainId = window.CURRENT_MOUNTAIN;
            const rangeId = window.CURRENT_RANGE;
            const sageId = window.CURRENT_SAGE;
            
            if (!mountainId || !rangeId || !sageId) {
                // 从URL解析
                const pathParts = window.location.pathname.split('/');
                window.CURRENT_MOUNTAIN = pathParts[pathParts.length - 4];
                window.CURRENT_RANGE = pathParts[pathParts.length - 3];
                const sageFile = pathParts[pathParts.length - 1];
                window.CURRENT_SAGE = sageFile.replace('.html', '');
            }
            
            // 加载智者数据
            const sageData = await this.loadSingleSage(
                window.CURRENT_MOUNTAIN, 
                window.CURRENT_RANGE, 
                window.CURRENT_SAGE
            );
            
            // 初始化对话系统
            window.dialogSystem = new DialogSystem(sageData);
            
            // 渲染页面内容
            const container = document.getElementById('dialog-content-container') || document.body;
            container.innerHTML = this.generate(sageData);
            
            // 更新进度显示
            this.updateProgressDisplay();
            
        } catch (error) {
            console.error('初始化智者对话页面失败:', error);
            this.showErrorMessage();
        }
    }

    /**
     * 加载单个智者的数据
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @param {string} sageId - 智者ID
     * @returns {Object} 智者数据对象
     */
    static async loadSingleSage(mountainId, rangeId, sageId) {
        try {
            const response = await fetch(`../../../data/${mountainId}/${rangeId}-sages.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const allSages = await response.json();
            const sage = allSages.find(s => s.id === sageId);
            
            if (!sage) {
                throw new Error(`找不到智者: ${sageId}`);
            }
            
            return sage;
        } catch (error) {
            console.error('加载智者数据失败:', error);
            return this.getFallbackSageData(sageId);
        }
    }

    /**
     * 获取备用智者数据
     * @param {string} sageId - 智者ID
     * @returns {Object} 备用智者数据
     */
    static getFallbackSageData(sageId) {
        return {
            id: sageId,
            name: '智者',
            title: '学者',
            avatar: '👨‍🏫',
            era: '古代',
            works: ['著作一', '著作二'],
            quote: '智慧的名言',
            introduction: '这是一位伟大的智者。',
            dialogues: [
                {
                    type: 'greeting',
                    sage: '欢迎，年轻的求学者。很抱歉，我的详细信息正在加载中。',
                    options: [
                        { text: '我明白了', next: 'farewell' }
                    ]
                },
                {
                    id: 'farewell',
                    sage: '感谢你的理解。请稍后再来拜访我。',
                    options: []
                }
            ]
        };
    }

    /**
     * 更新进度显示
     */
    static updateProgressDisplay() {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        
        // 更新总进度
        const totalProgressEl = document.getElementById('total-progress');
        if (totalProgressEl) {
            totalProgressEl.textContent = `${visitedSages.length}/420`;
        }

        // 更新当前山脉进度  
        const rangeProgressEl = document.getElementById('range-progress');
        if (rangeProgressEl && window.CURRENT_MOUNTAIN && window.CURRENT_RANGE) {
            const rangeKey = `${window.CURRENT_MOUNTAIN}-${window.CURRENT_RANGE}`;
            const rangeCompleted = visitedSages.filter(sage => sage.startsWith(rangeKey)).length;
            rangeProgressEl.textContent = `${rangeCompleted}/7`;
        }
    }

    /**
     * 显示错误信息
     */
    static showErrorMessage() {
        document.body.innerHTML = `
            <div class="error-container" style="text-align: center; padding: 50px; color: #666;">
                <h2>😔 加载失败</h2>
                <p>很抱歉，智者的信息暂时无法加载。</p>
                <button onclick="goBack()" style="padding: 10px 20px; margin: 10px; border: none; border-radius: 5px; cursor: pointer;">
                    返回山脉
                </button>
                <button onclick="location.reload()" style="padding: 10px 20px; margin: 10px; border: none; border-radius: 5px; cursor: pointer;">
                    重新加载
                </button>
            </div>
        `;
    }
}

/**
 * 对话系统类
 * 管理智者对话的状态和流程
 */
class DialogSystem {
    constructor(sageData) {
        this.sageData = sageData;
        this.currentDialog = sageData.dialogues[0];
        this.dialogHistory = [];
    }

    /**
     * 选择对话选项
     * @param {string} nextDialogId - 下一个对话的ID
     */
    selectOption(nextDialogId) {
        // 找到下一个对话
        const nextDialog = this.sageData.dialogues.find(d => d.id === nextDialogId);
        
        if (nextDialog) {
            this.currentDialog = nextDialog;
            this.dialogHistory.push(nextDialog);
            SageDialogGenerator.updateDialog(nextDialog);
        } else {
            // 对话结束
            this.completeDialog();
        }
    }

    /**
     * 完成对话
     */
    completeDialog() {
        // 标记智者为已拜访
        this.markSageVisited();

        // 显示完成信息
        const container = document.getElementById('options-container');
        if (container) {
            container.innerHTML = `
                <div class="completion-message">
                    <h3>🎉 与${this.sageData.name}的对话完成！</h3>
                    <p>你获得了来自${this.sageData.title}的珍贵智慧。</p>
                </div>
            `;
        }

        SageDialogGenerator.showCompletionButtons();
    }

    /**
     * 标记智者为已拜访
     */
    markSageVisited() {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        const sageKey = `${window.CURRENT_MOUNTAIN}-${window.CURRENT_RANGE}-${this.sageData.id}`;
        
        if (!visitedSages.includes(sageKey)) {
            visitedSages.push(sageKey);
            localStorage.setItem('visitedSages', JSON.stringify(visitedSages));
        }
        
        // 更新进度显示
        SageDialogGenerator.updateProgressDisplay();
    }
}

// 数据管理器
class SageDataManager {
    /**
     * 加载智者数据
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @returns {Array} 智者数据数组
     */
    static async loadSageData(mountainId, rangeId) {
        try {
            const response = await fetch(`../../../data/${mountainId}/${rangeId}-sages.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('加载智者数据失败:', error);
            return this.getFallbackData(rangeId);
        }
    }

    /**
     * 加载单个智者数据
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @param {string} sageId - 智者ID
     * @returns {Object} 智者数据对象
     */
    static async loadSingleSage(mountainId, rangeId, sageId) {
        const allSages = await this.loadSageData(mountainId, rangeId);
        return allSages.find(sage => sage.id === sageId);
    }

    /**
     * 获取备用数据
     * @param {string} rangeId - 山脉ID
     * @returns {Array} 备用智者数据
     */
    static getFallbackData(rangeId) {
        return Array.from({length: 7}, (_, index) => ({
            id: `sage${index + 1}`,
            name: `智者${index + 1}`,
            title: '学者',
            avatar: '👨‍🏫',
            era: '古代',
            works: ['著作一', '著作二'],
            quote: '智慧的名言',
            dialogues: [
                {
                    type: 'greeting',
                    sage: '欢迎，年轻的求学者。',
                    options: [
                        { text: '请教您的思想', next: 'teaching' },
                        { text: '告别', next: 'farewell' }
                    ]
                }
            ]
        }));
    }

    /**
     * 标记智者为已拜访
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @param {string} sageId - 智者ID
     */
    static markSageVisited(mountainId, rangeId, sageId) {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        const sageKey = `${mountainId}-${rangeId}-${sageId}`;
        
        if (!visitedSages.includes(sageKey)) {
            visitedSages.push(sageKey);
            localStorage.setItem('visitedSages', JSON.stringify(visitedSages));
        }
        
        // 更新UI显示
        SageDialogGenerator.updateProgressDisplay();
    }

    /**
     * 检查山脉是否完成
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @returns {boolean} 是否完成
     */
    static isRangeCompleted(mountainId, rangeId) {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        const rangeKey = `${mountainId}-${rangeId}`;
        const completed = visitedSages.filter(sage => sage.startsWith(rangeKey)).length;
        return completed >= 7;
    }

    /**
     * 检查山峰是否完成
     * @param {string} mountainId - 山峰ID
     * @returns {boolean} 是否完成
     */
    static isMountainCompleted(mountainId) {
        const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
        const mountainKey = `${mountainId}-`;
        const completed = visitedSages.filter(sage => sage.startsWith(mountainKey)).length;
        
        // 根据山峰类型判断完成条件
        if (mountainId === 'sun') return completed >= 6;
        if (mountainId === 'moon') return completed >= 7;
        return completed >= 28; // 其他山峰有4个山脉，每个7人
    }
}

// 导航控制器
class NavigationController {
    /**
     * 返回上一级页面
     */
    static goBack() {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('/sages/')) {
            // 从智者页面返回山脉页面
            const pathParts = currentPage.split('/');
            const mountainId = pathParts[pathParts.length - 4];
            const rangeId = pathParts[pathParts.length - 3];
            window.location.href = `../../../ranges/${mountainId}/${rangeId}-range.html`;
        } else if (currentPage.includes('/ranges/')) {
            // 从山脉页面返回山峰页面
            const pathParts = currentPage.split('/');
            const mountainId = pathParts[pathParts.length - 2];
            window.location.href = `../../mountains/${mountainId}-mountain.html`;
        } else {
            // 默认返回全景图
            window.location.href = '../../../index.html';
        }
    }

    /**
     * 访问智者
     * @param {string} mountainId - 山峰ID
     * @param {string} rangeId - 山脉ID
     * @param {string} sageId - 智者ID
     */
    static visitSage(mountainId, rangeId, sageId) {
        window.location.href = `../../sages/${mountainId}/${rangeId}/${sageId}.html`;
    }

    /**
     * 前往下一位智者
     */
    static nextSage() {
        const currentMountain = window.CURRENT_MOUNTAIN;
        const currentRange = window.CURRENT_RANGE;
        
        SageDataManager.loadSageData(currentMountain, currentRange).then(sages => {
            const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
            
            for (let sage of sages) {
                const sageKey = `${currentMountain}-${currentRange}-${sage.id}`;
                if (!visitedSages.includes(sageKey)) {
                    window.location.href = `${sage.id}.html`;
                    return;
                }
            }
            
            // 如果所有智者都已拜访，显示完成选项
            this.completeRange();
        });
    }

    /**
     * 完成山脉
     */
    static completeRange() {
        const currentMountain = window.CURRENT_MOUNTAIN;
        const currentRange = window.CURRENT_RANGE;
        
        // 显示山脉完成祝贺
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center;
            z-index: 3000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 500px;">
                <h2 style="color: #4169E1; margin-bottom: 20px;">🎉 恭喜完成山脉探索！</h2>
                <p style="margin-bottom: 20px; color: #333;">你已经拜访了${this.getRangeName(currentRange)}的所有7位智者！</p>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); goToNextRange();" 
                            style="background: #4169E1; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer;">
                        探索下一山脉
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); goBackToMountain();" 
                            style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer;">
                        返回山峰
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    /**
     * 获取山脉名称
     * @param {string} rangeId - 山脉ID
     * @returns {string} 山脉名称
     */
    static getRangeName(rangeId) {
        const names = {
            'evolution': '进化论与复杂科学山脉',
            'astronomy': '宇宙天文山川地理山脉',
            'physics': '物质规律山脉',
            'biology': '生物奥秘山脉',
            'chinese-history': '中国通史山脉',
            'world-history': '世界通史山脉',
            'chinese-period': '中国断代史与专题山脉',
            'western-period': '西方断代史与专题山脉'
            // ... 更多山脉名称
        };
        return names[rangeId] || '智慧山脉';
    }
}

// 全局函数（供HTML调用）
function initSagePage() {
    SageDialogGenerator.initializePage();
}

function goBack() {
    NavigationController.goBack();
}

function selectOption(nextDialogId) {
    if (window.dialogSystem) {
        window.dialogSystem.selectOption(nextDialogId);
    }
}

function nextSage() {
    NavigationController.nextSage();
}

function completeRange() {
    NavigationController.completeRange();
}

function goToNextRange() {
    // 实现前往下一个山脉的逻辑
    NavigationController.goBack();
}

function goBackToMountain() {
    NavigationController.goBack();
}

// 导出类（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SageDialogGenerator,
        DialogSystem,
        SageDataManager,
        NavigationController
    };
}