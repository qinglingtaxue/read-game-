// 山峰智者配置
const mountainConfig = {
  society: {
    name: "社会山",
    emoji: "🏛️",
    sages: [
      { id: "rousseau", name: "卢梭", emoji: "📜" },
      { id: "machiavelli", name: "马基雅维利", emoji: "👑" },
      { id: "marx", name: "马克思", emoji: "⚒️" },
      { id: "durkheim", name: "涂尔干", emoji: "🔬" },
      { id: "weber", name: "韦伯", emoji: "🏢" },
      { id: "simmel", name: "齐美尔", emoji: "🌐" },
      { id: "smith", name: "亚当·斯密", emoji: "💰" }
    ],
    rivers: ["权力之河", "公正之河", "秩序之河", "自由之河"]
  },
  organization: {
    name: "组织山",
    emoji: "🏢",
    sages: [
      { id: "taylor", name: "泰勒", emoji: "⚙️" },
      { id: "fayol", name: "法约尔", emoji: "📊" },
      { id: "koontz", name: "孔茨", emoji: "📋" },
      { id: "drucker", name: "德鲁克", emoji: "💼" },
      { id: "simon", name: "西蒙", emoji: "🧠" },
      { id: "march", name: "马奇", emoji: "🎯" },
      { id: "mintzberg", name: "明茨伯格", emoji: "🔄" }
    ],
    rivers: ["效率之河", "管理之河", "创新之河", "协作之河"]
  },
  family: {
    name: "家庭山",
    emoji: "👨‍👩‍👧‍👦",
    sages: [
      { id: "piaget", name: "皮亚杰", emoji: "👶" },
      { id: "vygotsky", name: "维果茨基", emoji: "🧩" },
      { id: "erikson", name: "埃里克森", emoji: "🌱" },
      { id: "bronfenbrenner", name: "布朗芬布伦纳", emoji: "🌍" },
      { id: "bowen", name: "鲍文", emoji: "🔗" },
      { id: "bateson", name: "贝特森", emoji: "🗣️" }
    ],
    rivers: ["亲情之河", "关爱之河", "传承之河", "温暖之河"]
  },
  humanity: {
    name: "人性山",
    emoji: "❤️",
    sages: [
      { id: "freud", name: "弗洛伊德", emoji: "🧠" },
      { id: "skinner", name: "斯金纳", emoji: "🔔" },
      { id: "bandura", name: "班杜拉", emoji: "👀" },
      { id: "allport", name: "奥尔波特", emoji: "🎭" },
      { id: "kelly", name: "凯利", emoji: "🔍" },
      { id: "simon_h", name: "西蒙", emoji: "⚖️" },
      { id: "rogers", name: "罗杰斯", emoji: "🤗" }
    ],
    rivers: ["欲望之河", "情感之河", "理性之河", "本能之河"]
  },
  body: {
    name: "身体山",
    emoji: "💪",
    sages: [
      { id: "knight", name: "奈特", emoji: "🏃‍♂️" },
      { id: "abraham", name: "亚伯拉罕", emoji: "🧘‍♂️" },
      { id: "mukherjee", name: "穆克吉", emoji: "🔬" },
      { id: "hippocrates", name: "希波克拉底", emoji: "⚕️" },
      { id: "harvey", name: "哈维", emoji: "❤️" },
      { id: "pavlov", name: "巴甫洛夫", emoji: "🐕" }
    ],
    rivers: ["生命之河", "健康之河", "力量之河", "平衡之河"]
  },
  beliefs: {
    name: "信念山",
    emoji: "🙏",
    sages: [
      { id: "hume", name: "休谟", emoji: "🤔" },
      { id: "russell", name: "罗素", emoji: "🔬" },
      { id: "dawkins", name: "道金斯", emoji: "🧬" },
      { id: "sagan", name: "萨根", emoji: "🌌" },
      { id: "yangming", name: "王阳明", emoji: "☯️" },
      { id: "james", name: "詹姆斯", emoji: "💭" },
      { id: "haidt", name: "海特", emoji: "⚖️" }
    ],
    rivers: ["信仰之河", "理性之河", "直觉之河", "道德之河"]
  }
};

// 生成HTML智者区域
function generateSagesHTML(mountainKey) {
  const config = mountainConfig[mountainKey];
  const sages = config.sages;
  
  // 前4个智者在河边
  const riverSages = sages.slice(0, 4);
  // 后2-3个智者在对话框右侧
  const dialogSages = sages.slice(4);
  
  let html = `        <!-- 河边的智者们 -->
        <div class="sages-by-river">`;
  
  // 河边智者
  riverSages.forEach((sage, index) => {
    const positions = ['15%', '35%', '60%', '75%'];
    const bottoms = ['20px', '30px', '25px', '30px'];
    
    html += `
            <div class="sage-figure sage-${sage.id}" data-sage="${sage.id}" onclick="exploreRiver('${sage.id}')">
                <div class="sage-avatar">${sage.emoji}</div>
                <div class="sage-name">${sage.name}</div>
            </div>`;
  });
  
  // 对话框右侧智者
  dialogSages.forEach((sage, index) => {
    html += `
            
            <div class="sage-figure sage-${sage.id}" data-sage="${sage.id}" onclick="exploreRiver('${sage.id}')">
                <div class="sage-avatar">${sage.emoji}</div>
                <div class="sage-name">${sage.name}</div>
            </div>`;
  });
  
  html += `
        </div>`;
  
  return html;
}

// 生成CSS智者定位
function generateSagesCSS(mountainKey) {
  const config = mountainConfig[mountainKey];
  const sages = config.sages;
  
  // 前4个智者在河边
  const riverSages = sages.slice(0, 4);
  // 后2-3个智者在对话框右侧
  const dialogSages = sages.slice(4);
  
  let css = `/* 智者位置 - ${config.name}相关的思想家 */\n`;
  
  // 河边智者定位
  riverSages.forEach((sage, index) => {
    const positions = ['15%', '35%', '60%', '75%'];
    const bottoms = ['20px', '30px', '25px', '30px'];
    
    css += `.sage-${sage.id} {
    bottom: ${bottoms[index]};
    left: ${positions[index]};
}

`;
  });
  
  // 对话框右侧智者定位
  dialogSages.forEach((sage, index) => {
    const leftPositions = ['65%', '55%', '45%'];
    
    css += `.sage-${sage.id} {
    position: absolute !important;
    top: -75% !important;
    left: ${leftPositions[index]} !important;
    bottom: auto !important;
    right: auto !important;
    z-index: 15 !important;
}

`;
  });
  
  // 对话框右侧智者的特殊样式
  if (dialogSages.length > 0) {
    const sageSelectors = dialogSages.map(sage => `.sage-${sage.id}`).join(', ');
    
    css += `/* 对话框右侧智者的特殊样式 */
${sageSelectors} .sage-avatar {
    font-size: 2.8rem;
    animation: floatSage 4s ease-in-out infinite;
}

${sageSelectors} .sage-name {
    background: rgba(255,255,255,0.95);
    border: 1px solid rgba(139, 69, 19, 0.3);
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
}

/* 悬停效果 */
${sageSelectors}:hover {
    transform: scale(1.15) translateY(-8px) !important;
}

/* 光晕效果 */
${sageSelectors}::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: sageGlow 3s ease-in-out infinite;
}

`;
  }
  
  return css;
}

// 生成河流HTML
function generateRiversHTML(mountainKey) {
  const config = mountainConfig[mountainKey];
  const rivers = config.rivers;
  const riverClasses = ['river-first', 'river-second', 'river-third', 'river-fourth'];
  
  let html = `        <!-- 四条${config.name.replace('山', '')}之河 -->
        <div class="rivers">`;
  
  rivers.forEach((river, index) => {
    html += `
            <div class="river ${riverClasses[index]}" title="${river}"></div>`;
  });
  
  html += `
        </div>`;
  
  return html;
}

// 生成JavaScript数组
function generateSagesJS(mountainKey) {
  const config = mountainConfig[mountainKey];
  const sageIds = config.sages.map(sage => sage.id);
  
  return `const ${mountainKey}Sages = ${JSON.stringify(sageIds)};`;
}

// 生成完整HTML文件
function generateCompleteHTML(mountainKey) {
  const config = mountainConfig[mountainKey];
  const sageIds = config.sages.map(sage => `'${sage.id}'`).join(', ');
  
  return `<!DOCTYPE html>
<html lang="zh-CN" data-mountain="${mountainKey}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name}探索之旅</title>
    <link rel="stylesheet" href="css/color-schemes.css">
    <link rel="stylesheet" href="css/${mountainKey}-mountain.css">
</head>
<body>
    <button class="back-btn" onclick="goBack()">← 返回选择</button>
    
    <!-- 进度显示 -->
    <div class="progress-display">
        <span class="mountain-progress">${config.name}进度：<span id="mountain-progress">0/${config.sages.length}</span></span>
        <span class="total-progress">总进度：<span id="total-progress">0/420</span></span>
    </div>
    
    <div class="mountain-scene">
        <!-- 主要装饰元素（根据各山峰主题） -->
        <div class="main-decoration"></div>
        
        <!-- 装饰元素 -->
        <div class="theme-decorations">
            <!-- 各山峰特色装饰 -->
        </div>
        
        <!-- 云朵 -->
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        
        <!-- 山脉层次 -->
        <div class="distant-mountains"></div>
        <div class="middle-mountains"></div>
        <div class="front-mountains"></div>

${generateRiversHTML(mountainKey)}
        
${generateSagesHTML(mountainKey)}
        
        <!-- 导游人物和对话气泡 -->
        <div class="guide-section">
            <div class="guide-character">
                <div class="guide-avatar">${config.emoji}</div>
                <div class="guide-name">${config.name.replace('山', '')}向导</div>
            </div>
            <div class="speech-bubble">
                <div class="bubble-content">
                    <h3>${config.emoji} 在天外，有一座${config.name}</h3>
                    <p>${config.name}里有四条河，叫${config.rivers.join('、')}，河水终日川流不息，孕育了人类的智慧。</p>
                </div>
                <div class="bubble-tail"></div>
            </div>
        </div>

        <!-- 探索提示 -->
        <div class="exploration-hint">
            ${config.emoji} 点击河边的智者开始对话
        </div>
    </div>

    <!-- 背景音乐 -->
    <audio id="bgMusic" loop>
        <source src="music/${mountainKey}-mountain-bg.mp3" type="audio/mpeg">
        <source src="music/${mountainKey}-mountain-bg.ogg" type="audio/ogg">
    </audio>

    <!-- 音乐控制按钮 -->
    <button class="music-toggle" id="musicBtn" onclick="toggleBgMusic()">🎵</button>

    <script>
        // 返回全景图
        function goBack() {
            window.location.href = 'index.html';
        }

        // 拜访智者
        function exploreRiver(sageId) {
            window.location.href = \`sages/${mountainKey}/\${sageId}.html\`;
        }

        // 检查山峰完成状态
        function checkMountainComplete() {
            const visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
            const ${mountainKey}Sages = [${sageIds}];
            const completedCount = ${mountainKey}Sages.filter(sage => visitedSages.includes(\`${mountainKey}-\${sage}\`)).length;
            
            document.getElementById('mountain-progress').textContent = \`\${completedCount}/${config.sages.length}\`;
            document.getElementById('total-progress').textContent = \`\${visitedSages.length}/420\`;
            
            // 更新智者状态显示
            ${mountainKey}Sages.forEach(sage => {
                const sageElement = document.querySelector(\`[data-sage="\${sage}"]\`);
                if (visitedSages.includes(\`${mountainKey}-\${sage}\`)) {
                    sageElement.classList.add('visited');
                }
            });
            
            // 只有在刚好完成${config.name}时显示提示（避免重复显示）
            if (completedCount === ${config.sages.length} && !localStorage.getItem('${mountainKey}MountainCompleted')) {
                localStorage.setItem('${mountainKey}MountainCompleted', 'true');
                showNextMountainOption();
            }
        }

        // 显示前往下一座山的选项
        function showNextMountainOption() {
            const modal = document.createElement('div');
            modal.style.cssText = \`
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 2000;
            \`;
            
            modal.innerHTML = \`
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; position: relative;">
                    <span onclick="this.parentElement.parentElement.remove()" 
                  style="position: absolute; top: 15px; right: 20px; cursor: pointer; font-size: 24px; color: #999; font-weight: bold; user-select: none;">&times;</span>
                    
                    <h3 style="color: var(--primary-color); margin-bottom: 20px;">${config.emoji} 恭喜完成${config.name}探索！</h3>
                    <p style="margin-bottom: 20px;">你已拜访了${config.name}的所有${config.sages.length}位智者，获得了珍贵的智慧。</p>
                    
                    <button onclick="goToNextMountain()" style="background: var(--primary-color); color: white; border: none; padding: 12px 25px; border-radius: 25px; margin: 5px; cursor: pointer;">前往下一座山</button>
                    <button onclick="goBack()" style="background: var(--secondary-color); color: white; border: none; padding: 12px 25px; border-radius: 25px; margin: 5px; cursor: pointer;">返回全景</button>
                </div>
            \`;
            
            document.body.appendChild(modal);
        }

        // 前往下一座山
        function goToNextMountain() {
            // 这里需要根据实际的山峰顺序来设置
            window.location.href = 'index.html';
        }

        // 背景音乐控制
        const bgMusic = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicBtn');

        if (bgMusic) {
            bgMusic.volume = 0.3;
        }

        function toggleBgMusic() {
            if (!bgMusic) return;
            
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicBtn.textContent = '🔊';
                }).catch(error => {
                    console.log('播放失败，请检查音频文件');
                });
            } else {
                bgMusic.pause();
                musicBtn.textContent = '🔇';
            }
        }

        let hasInteracted = false;
        document.addEventListener('click', function() {
            if (!hasInteracted && bgMusic) {
                hasInteracted = true;
                bgMusic.play().then(() => {
                    musicBtn.textContent = '🔊';
                }).catch(() => {});
            }
        });

        window.addEventListener('load', checkMountainComplete);
    </script>

    <style>
    .music-toggle {
        position: fixed;
        top: 70px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .music-toggle:hover {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 1);
    }
    </style>
</body>
</html>`;
}

// 使用示例
console.log("=== 社会山 HTML ===");
console.log(generateCompleteHTML('society'));

console.log("\n=== 社会山 CSS 智者定位 ===");
console.log(generateSagesCSS('society'));

console.log("\n=== 组织山 HTML ===");
console.log(generateCompleteHTML('organization'));

console.log("\n=== 家庭山 CSS 智者定位 ===");
console.log(generateSagesCSS('family'));