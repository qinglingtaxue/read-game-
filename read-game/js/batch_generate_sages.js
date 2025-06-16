const fs = require('fs');
const path = require('path');

// 批量生成智者对话页面的脚本
// 适用于现有的 sages 目录结构

// 智者配置 - 根据你的需求
const mountainSages = {
  society: [
    { id: "rousseau", name: "卢梭", emoji: "📜", theme: "linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)", subtitle: "社会契约论与自然状态", books: ["社会契约论", "爱弥儿"] },
    { id: "machiavelli", name: "马基雅维利", emoji: "👑", theme: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)", subtitle: "君主论与权力哲学", books: ["君主论", "论李维"] },
    { id: "marx", name: "马克思", emoji: "⚒️", theme: "linear-gradient(135deg, #B22222 0%, #FF4500 100%)", subtitle: "历史唯物主义与阶级斗争", books: ["资本论", "共产党宣言"] },
    { id: "durkheim", name: "涂尔干", emoji: "🔬", theme: "linear-gradient(135deg, #4682B4 0%, #87CEEB 100%)\"", subtitle: "社会学方法论", books: ["社会分工论", "自杀论"] },
    { id: "weber", name: "韦伯", emoji: "🏢", theme: "linear-gradient(135deg, #2F4F4F 0%, #708090 100%)\"", subtitle: "理性化与新教伦理", books: ["新教伦理与资本主义精神", "经济与社会"] },
    { id: "simmel", name: "齐美尔", emoji: "🌐", theme: "linear-gradient(135deg, #9370DB 0%, #BA55D3 100%)\"", subtitle: "形式社会学", books: ["社会学", "货币哲学"] },
    { id: "smith", name: "亚当·斯密", emoji: "💰", theme: "linear-gradient(135deg, #DAA520 0%, #FFD700 100%)\"", subtitle: "国富论与看不见的手", books: ["国富论", "道德情操论"] }
  ],
  organization: [
    { id: "taylor", name: "泰勒", emoji: "⚙️", theme: "linear-gradient(135deg, #4169E1 0%, #6495ED 100%)", subtitle: "科学管理理论", books: ["科学管理原理"] },
    { id: "fayol", name: "法约尔", emoji: "📊", theme: "linear-gradient(135deg, #CD853F 0%, #D2B48C 100%)", subtitle: "一般管理理论", books: ["工业管理与一般管理"] },
    { id: "koontz", name: "孔茨", emoji: "📋", theme: "linear-gradient(135deg, #708090 0%, #A9A9A9 100%)", subtitle: "现代管理学原理", books: ["管理学"] },
    { id: "drucker", name: "德鲁克", emoji: "💼", theme: "linear-gradient(135deg, #2F4F4F 0%, #696969 100%)", subtitle: "目标管理与知识工作者", books: ["管理实践", "卓有成效的管理者"] },
    { id: "simon", name: "西蒙", emoji: "🧠", theme: "linear-gradient(135deg, #4B0082 0%, #8A2BE2 100%)", subtitle: "决策理论与有限理性", books: ["管理行为", "人工科学"] },
    { id: "march", name: "马奇", emoji: "🎯", theme: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)", subtitle: "组织行为学", books: ["组织"] },
    { id: "mintzberg", name: "明茨伯格", emoji: "🔄", theme: "linear-gradient(135deg, #006400 0%, #228B22 100%)", subtitle: "管理角色与战略形成", books: ["管理工作的本质", "战略过程"] }
  ],
  family: [
    { id: "piaget", name: "皮亚杰", emoji: "👶", theme: "linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)", subtitle: "儿童认知发展理论", books: ["儿童心理学", "发生认识论"] },
    { id: "vygotsky", name: "维果茨基", emoji: "🧑‍🏫", theme: "linear-gradient(135deg, #20B2AA 0%, #48D1CC 100%)", subtitle: "社会文化理论", books: ["思维与语言", "教育心理学"] },
    { id: "erikson", name: "埃里克森", emoji: "👨‍👩‍👧‍👦", theme: "linear-gradient(135deg, #9370DB 0%, #BA55D3 100%)", subtitle: "心理社会发展理论", books: ["童年与社会", "同一性：青少年与危机"] },
    { id: "bronfenbrenner", name: "布朗芬布伦纳", emoji: "🌳", theme: "linear-gradient(135deg, #228B22 0%, #32CD32 100%)", subtitle: "生态系统理论", books: ["人类发展生态学"] },
    { id: "bowen", name: "鲍文", emoji: "👨‍👩‍👧", theme: "linear-gradient(135deg, #DC143C 0%, #FF69B4 100%)", subtitle: "家庭系统理论", books: ["家庭治疗中的概念与临床实践"] },
    { id: "bateson", name: "贝特森", emoji: "👨‍👧‍👦", theme: "linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%)", subtitle: "系统论与沟通理论", books: ["走向心智生态学"] }
  ],
  humanity: [
    { id: "freud", name: "弗洛伊德", emoji: "🧠", theme: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)", subtitle: "精神分析学", books: ["梦的解析", "精神分析引论"] },
    { id: "skinner", name: "斯金纳", emoji: "🔔", theme: "linear-gradient(135deg, #4169E1 0%, #0000FF 100%)", subtitle: "行为主义心理学", books: ["沃尔登第二", "超越自由与尊严"] },
    { id: "bandura", name: "班杜拉", emoji: "👀", theme: "linear-gradient(135deg, #228B22 0%, #32CD32 100%)", subtitle: "社会学习理论", books: ["社会学习理论"] },
    { id: "allport", name: "奥尔波特", emoji: "🎭", theme: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)", subtitle: "人格心理学", books: ["人格：一种心理学解释"] },
    { id: "kelly", name: "凯利", emoji: "🔍", theme: "linear-gradient(135deg, #2F4F4F 0%, #708090 100%)", subtitle: "个人构念理论", books: ["人格心理学"] },
    { id: "simon_h", name: "西蒙", emoji: "⚖️", theme: "linear-gradient(135deg, #4B0082 0%, #6A5ACD 100%)", subtitle: "认知科学", books: ["人类问题解决"] },
    { id: "bogisen", name: "布吉森", emoji: "❓", theme: "linear-gradient(135deg, #CCCCCC 0%, #AAAAAA 100%)\"", subtitle: "待补充", books: [] }
  ],
  body: [
    { id: "knight", name: "奈特", emoji: "🏃‍♂️", theme: "linear-gradient(135deg, #FF4500 0%, #FF6347 100%)", subtitle: "运动科学", books: ["运动生理学"] },
    { id: "abraham", name: "亚伯拉罕", emoji: "🧘‍♂️", theme: "linear-gradient(135deg, #20B2AA 0%, #00CED1 100%)", subtitle: "身心医学", books: ["身心医学基础"] },
    { id: "mukherjee", name: "悉达多·穆克吉", emoji: "🔬", theme: "linear-gradient(135deg, #DC143C 0%, #B22222 100%)", subtitle: "癌症研究与医学史学", books: ["万病之王：癌症传", "基因传"] },
    { id: "williams", name: "威廉斯", emoji: "🧬", theme: "linear-gradient(135deg, #8A2BE2 0%, #9932CC 100%)", subtitle: "进化论与身体", books: ["Why We Get Sick: The New Science of Darwinian Medicine"] },
    { id: "collins", name: "柯林斯", emoji: "🧠", theme: "linear-gradient(135deg, #2F4F4F 0%, #708090 100%)", subtitle: "神经科学与意识", books: ["行为遗传学", "生命之书"] },
    { id: "venter", name: "文特尔", emoji: "🧪", theme: "linear-gradient(135deg, #008B8B 0%, #00CED1 100%)", subtitle: "基因组学与合成生物学", books: ["生命的速度", "解码生命"] },
    { id: "plomin", name: "普罗明", emoji: "👨‍👩‍👧‍👦", theme: "linear-gradient(135deg, #CD853F 0%, #D2B48C 100%)", subtitle: "行为遗传学", books: ["基因与行为"] },
    { id: "mukherjee_2", name: "悉达多·穆克吉", emoji: "💡", theme: "linear-gradient(135deg, #DAA520 0%, #FFD700 100%)", subtitle: "医学与伦理", books: ["基因传", "癌症传"] }
  ],
  beliefs: [
    { id: "hume", name: "休谟", emoji: "🤔", theme: "linear-gradient(135deg, #2F4F4F 0%, #696969 100%)", subtitle: "经验主义与怀疑论", books: ["人性论", "人类理解研究"] },
    { id: "russell", name: "罗素", emoji: "🔬", theme: "linear-gradient(135deg, #4B0082 0%, #8A2BE2 100%)", subtitle: "逻辑哲学", books: ["哲学问题", "数学原理"] },
    { id: "dawkins", name: "道金斯", emoji: "🧬", theme: "linear-gradient(135deg, #228B22 0%, #32CD32 100%)", subtitle: "进化论与理性主义", books: ["自私的基因", "盲眼钟表匠"] },
    { id: "sagan", name: "萨根", emoji: "🌌", theme: "linear-gradient(135deg, #191970 0%, #4169E1 100%)", subtitle: "天文学与科学精神", books: ["宇宙", "暗淡蓝点"] },
    { id: "yangming", name: "王阳明", emoji: "☯️", theme: "linear-gradient(135deg, #8B4513 0%, #D2B48C 100%)", subtitle: "心学与知行合一", books: ["传习录"] },
    { id: "james", name: "詹姆斯", emoji: "💭", theme: "linear-gradient(135deg, #9370DB 0%, #BA55D3 100%)", subtitle: "实用主义哲学", books: ["实用主义", "心理学原理"] },
    { id: "haidt", name: "海特", emoji: "⚖️", theme: "linear-gradient(135deg, #DC143C 0%, #FF69B4 100%)", subtitle: "道德心理学", books: ["正义之心", "象与骑象人"] }
  ],
  sun: [
    { id: "buddha", name: "佛陀", emoji: "🧘", theme: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", subtitle: "佛教哲学", books: ["金刚经", "心经"] },
    { id: "confucius", name: "孔子", emoji: "🧐", theme: "linear-gradient(135deg, #8B4513 0%, #D2B48C 100%)", subtitle: "儒家思想", books: ["论语"] },
    { id: "jesus", name: "耶稣", emoji: "🙏", theme: "linear-gradient(135deg, #FF6347 0%, #CD5C5C 100%)", subtitle: "基督教教义", books: ["圣经"] },
    { id: "plato", name: "柏拉图", emoji: "🏛️", theme: "linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%)", subtitle: "理想国与哲学", books: ["理想国", "会饮篇"] },
    { id: "socrates", name: "苏格拉底", emoji: "🗣️", theme: "linear-gradient(135deg, #708090 0%, #A9A9A9 100%)", subtitle: "辩证法与伦理", books: ["申辩篇"] },
    { id: "zhuangzi", name: "庄子", emoji: "🦋", theme: "linear-gradient(135deg, #228B22 0%, #32CD32 100%)", subtitle: "道家思想与逍遥游", books: ["庄子", "逍遥游", "齐物论"], image: "images/zhuangzi.png" } // <-- 添加 image 属性
  ],
};

// 生成单个智者页面的HTML
function generateSageHTML(mountain, sage) {
  const mountainNames = {
    society: '社会山',
    organization: '组织山', 
    family: '家庭山',
    humanity: '人性山',
    body: '身体山',
    beliefs: '信仰山',
    sun: '太阳山'
  };

  const mountainHTMLFiles = {
    society: 'society-mountain.html',
    organization: 'organization-mountain.html',
    family: 'family-mountain.html',
    humanity: 'humanity-mountain.html',
    body: 'body-mountain.html',
    beliefs: 'faith-mountain.html',
    sun: 'sun-mountain.html'
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>与${sage.name}对话 - 智慧之峰</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '宋体', serif;
            background: ${sage.theme};
            min-height: 100vh;
            position: relative;
        }
        
        /* 返回按钮 */
        .back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: rgba(139, 69, 19, 0.9);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background: rgba(139, 69, 19, 1);
            transform: translateY(-2px);
        }
        
        /* 书房场景 */
        .study-room {
            position: relative;
            width: 100%;
            height: 100vh;
            background: 
                radial-gradient(circle at 70% 30%, rgba(255,215,0,0.1) 0%, transparent 50%),
                ${sage.theme};
            overflow: hidden;
        }
        
        /* 书架背景 */
        .bookshelf {
            position: absolute;
            top: 10%;
            left: 5%;
            right: 5%;
            height: 70%;
            background: 
                repeating-linear-gradient(
                    0deg,
                    rgba(139, 69, 19, 0.8) 0px,
                    rgba(139, 69, 19, 0.8) 40px,
                    rgba(160, 82, 45, 0.8) 40px,
                    rgba(160, 82, 45, 0.8) 80px
                );
            border-radius: 10px;
            box-shadow: inset 0 0 50px rgba(0,0,0,0.3);
        }
        
        /* 书籍装饰 */
        .books {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    transparent 20px,
                    rgba(139, 69, 19, 0.3) 20px,
                    rgba(139, 69, 19, 0.3) 25px
                );
        }
        
        /* 智者形象 */
        .sage-portrait {
            position: absolute;
            bottom: 15%;
            right: 10%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8rem;
            animation: sageFloat 3s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        @keyframes sageFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* 对话区域 */
        .dialogue-container {
            position: absolute;
            bottom: 5%;
            left: 5%;
            right: 25%;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-height: 60%;
            overflow-y: auto;
        }
        
        .sage-name-title {
            font-size: 24px;
            color: #8B4513;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #CD853F;
            padding-bottom: 10px;
        }
        
        .dialogue-content {
            font-size: 16px;
            line-height: 1.8;
            color: #2F4F4F;
        }
        
        .quote {
            font-style: italic;
            color: #4682B4;
            margin: 15px 0;
            padding: 10px 20px;
            border-left: 4px solid #CD853F;
            background: rgba(205, 133, 63, 0.1);
        }
        
        .wisdom-point {
            background: rgba(255, 215, 0, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid rgba(255, 215, 0, 0.5);
        }
        
        /* 完成按钮 */
        .complete-btn {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #32CD32, #228B22);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(50, 205, 50, 0.3);
        }
        
        .complete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(50, 205, 50, 0.4);
        }
        
        /* 古典装饰 */
        .decoration {
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: rotate 20s linear infinite;
        }

        .decoration-1 {
            top: 5%;
            left: 5%;
            width: 80px;
            height: 80px;
            animation-duration: 25s;
        }

        .decoration-2 {
            bottom: 10%;
            left: 15%;
            width: 120px;
            height: 120px;
            animation-duration: 30s;
            animation-direction: reverse;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .back-btn {
                padding: 8px 15px;
                font-size: 12px;
            }

            .sage-portrait {
                width: 120px;
                height: 120px;
                font-size: 5rem;
                right: 5%;
                bottom: initial;
                top: 5%;
            }

            .dialogue-container {
                left: 5%;
                right: 5%;
                width: 90%;
                padding: 20px;
                bottom: 5%;
                max-height: 70%;
            }

            .sage-name-title {
                font-size: 20px;
            }

            .dialogue-content {
                font-size: 14px;
            }

            .complete-btn {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <button class="back-btn" onclick="goBack()">← 返回${mountainNames[mountain]}</button>
    <div class="study-room">
        <div class="bookshelf"></div>
        <div class="books"></div>
        <div class="sage-portrait">${sage.image ? `<img src="/read-game/${sage.image}" alt="${sage.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : sage.emoji}</div>
        <div class="dialogue-container">
            <h2 class="sage-name-title">与 ${sage.name} 对话</h2>
            <p class="dialogue-content">
                ${sage.name} 是 ${sage.period} 的 ${sage.title}，主要贡献是 ${sage.contribution}。
            </p>
            <blockquote class="quote">“${sage.quote}”</blockquote>
            <p class="dialogue-content">
                他的主要著作包括：《${(sage.books || []).join('》、《')}》。
            </p>
            <div class="wisdom-point">
                <h3>核心智慧点:</h3>
                <ul>
                    <li>${sage.subtitle}</li>
                    <li>通过阅读他的著作，你可以更深入地理解这些思想。</li>
                </ul>
            </div>
        </div>
        <button class="complete-btn" onclick="markSageAsVisited('${mountain}-${sage.id}')">✔️ 拜访完成</button>
        <div class="decoration decoration-1"></div>
        <div class="decoration decoration-2"></div>
    </div>

    <script>
        // 返回山峰
        function goBack() {
            window.location.href = '/read-game/' + mountainHTMLFiles[mountain];
        }

        // 标记智者已拜访
        function markSageAsVisited(sageKey) {
            let visitedSages = JSON.parse(localStorage.getItem('visitedSages') || '[]');
            if (!visitedSages.includes(sageKey)) {
                visitedSages.push(sageKey);
                localStorage.setItem('visitedSages', JSON.stringify(visitedSages));
                alert('恭喜，您已成功拜访这位智者！');
            }
        }
    </script>
</body>
</html>
`;
}

// 生成所有智者页面
function generateAllSagesHTML() {
  for (const mountain in mountainSages) {
    if (mountainSages.hasOwnProperty(mountain)) {
      const sages = mountainSages[mountain];
      const dirPath = path.join(__dirname, '../sages', mountain);
      
      // 确保目录存在
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`创建目录: ${dirPath}`);
      }

      sages.forEach(sage => {
        const htmlContent = generateSageHTML(mountain, sage);
        const filePath = path.join(dirPath, `${sage.id}.html`);
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        console.log(`生成文件: ${filePath}`);
      });
    }
  }
  console.log('所有智者页面生成完毕！');
}

// 运行生成
generateAllSagesHTML();