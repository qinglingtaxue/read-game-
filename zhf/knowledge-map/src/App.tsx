import React, { useState, useCallback, useEffect } from 'react';
import { Mountain, Star, BookOpen, Users, ZoomIn, ZoomOut, Home } from 'lucide-react';
import './App.css';

const KnowledgeMapGame: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [discoveredAreas, setDiscoveredAreas] = useState(['太阳山']);
  const [score, setScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [showScholar, setShowScholar] = useState<any>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [moonAngle, setMoonAngle] = useState(0);

  // 月亮公转动画
  useEffect(() => {
    const interval = setInterval(() => {
      setMoonAngle(prevAngle => (prevAngle + 0.02) % (2 * Math.PI));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // 地图元素定义
  const mapElements: any = {
    太阳山: {
      type: 'mountain',
      x: 500, // 向右移动50像素，更居中
      y: 400, // 向下移动50像素
      size: 80,
      color: '#FFD700',
      discovered: true,
      rivers: [
        { name: '古中国河', startX: 500, startY: 400, endX: 350, endY: 500, scholars: ['孔子', '庄子'] },
        { name: '古希腊河', startX: 500, startY: 400, endX: 650, endY: 500, scholars: ['苏格拉底', '柏拉图'] },
        { name: '古印度河', startX: 500, startY: 400, endX: 400, endY: 550, scholars: ['佛陀'] },
        { name: '古希伯来河', startX: 500, startY: 400, endX: 600, endY: 550, scholars: ['耶稣'] }
      ],
      peaks: [
        { name: '文明峰', x: 500, y: 380, scholars: ['孔子', '苏格拉底', '佛陀', '耶稣'] }
      ]
    },
    
    月亮山: {
      type: 'mountain',
      x: 350,
      y: 300,
      size: 60,
      color: '#C0C0C0',
      discovered: false,
      peaks: [
        { name: '笛卡尔峰', x: -20, y: -20, scholars: ['笛卡尔', '康德'] },
        { name: '故事峰', x: 0, y: -30, scholars: ['休谟', '维特根斯坦'] },
        { name: '达尔文峰', x: 20, y: -20, scholars: ['达尔文', '波兰尼'] }
      ]
    },

    // 第一层外围 - 人性、身体、信仰山（半径180的圆，120度间隔）
    人性山: {
      type: 'mountain',
      x: 344, // 500 + 180*cos(210°) ≈ 344
      y: 310, // 400 + 180*sin(210°) = 310
      size: 65,
      color: '#BA55D3',
      discovered: false,
      peaks: [
        { name: '心理峰', x: 324, y: 290, scholars: ['弗洛伊德', '荣格'] },
        { name: '认知峰', x: 344, y: 280, scholars: ['卡尼曼', '平克'] },
        { name: '语言峰', x: 364, y: 290, scholars: ['乔姆斯基', '索绪尔'] }
      ]
    },

    身体山: {
      type: 'mountain',
      x: 656, // 500 + 180*cos(330°) ≈ 656
      y: 310, // 400 + 180*sin(330°) = 310
      size: 55,
      color: '#40E0D0',
      discovered: false,
      peaks: [
        { name: '生理峰', x: 636, y: 290, scholars: ['威利特', '罗斯'] },
        { name: '心理峰', x: 656, y: 280, scholars: ['贝克', '海斯'] },
        { name: '医疗峰', x: 676, y: 290, scholars: ['萨克斯', '穆克吉'] }
      ]
    },

    信仰山: {
      type: 'mountain',
      x: 500, // 500 + 180*cos(90°) = 500
      y: 580, // 400 + 180*sin(90°) = 580
      size: 60,
      color: '#FF7F50',
      discovered: false,
      peaks: [
        { name: '儒家峰', x: 480, y: 560, scholars: ['孔子', '王阳明'] },
        { name: '东方峰', x: 500, y: 550, scholars: ['老子', '惠能'] },
        { name: '西方峰', x: 520, y: 560, scholars: ['荣格', '蒂利希'] }
      ]
    },

    // 第二层外围 - 社会、家庭、组织山（半径260的圆，120度间隔）
    社会山: {
      type: 'mountain',
      x: 275, // 500 + 260*cos(210°) ≈ 275
      y: 270, // 400 + 260*sin(210°) = 270
      size: 60,
      color: '#98FB98',
      discovered: false,
      peaks: [
        { name: '交换峰', x: 255, y: 250, scholars: ['福柯', '布尔迪厄'] },
        { name: '经济峰', x: 275, y: 240, scholars: ['凯恩斯', '哈耶克'] },
        { name: '政治峰', x: 295, y: 250, scholars: ['罗尔斯', '阿伦特'] }
      ]
    },

    家庭山: {
      type: 'mountain',
      x: 725, // 500 + 260*cos(330°) ≈ 725
      y: 270, // 400 + 260*sin(330°) = 270
      size: 50,
      color: '#FFB6C1',
      discovered: false,
      peaks: [
        { name: '创建峰', x: 705, y: 250, scholars: ['戈特曼', '巴斯'] },
        { name: '扩大峰', x: 725, y: 240, scholars: ['皮亚杰', '高普尼克'] },
        { name: '治疗峰', x: 745, y: 250, scholars: ['萨提亚', '米纽庆'] }
      ]
    },

    组织山: {
      type: 'mountain',
      x: 500, // 500 + 260*cos(90°) = 500
      y: 660, // 400 + 260*sin(90°) = 660
      size: 55,
      color: '#DDA0DD',
      discovered: false,
      peaks: [
        { name: '人峰', x: 480, y: 640, scholars: ['德鲁克', '西蒙'] },
        { name: '钱峰', x: 500, y: 630, scholars: ['巴菲特', '格雷厄姆'] },
        { name: '事峰', x: 520, y: 640, scholars: ['科特勒', '特劳特'] }
      ]
    },

    // 第三层外围 - 世界、时代、历史山（半径360的圆，120度间隔）
    世界山: {
      type: 'mountain',
      x: 188, // 500 + 360*cos(210°) ≈ 188
      y: 220, // 400 + 360*sin(210°) = 220
      size: 70,
      color: '#87CEEB',
      discovered: false,
      peaks: [
        { name: '进化峰', x: 168, y: 200, scholars: ['道金斯', '古尔德'] },
        { name: '宇宙峰', x: 188, y: 190, scholars: ['萨根', '霍金'] },
        { name: '物质峰', x: 208, y: 200, scholars: ['费曼', '波义耳'] }
      ]
    },

    时代山: {
      type: 'mountain',
      x: 812, // 500 + 360*cos(330°) ≈ 812
      y: 220, // 400 + 360*sin(330°) = 220
      size: 55,
      color: '#FF6347',
      discovered: false,
      peaks: [
        { name: '暴力峰', x: 792, y: 200, scholars: ['孙武', '克劳塞维茨'] },
        { name: '互联峰', x: 812, y: 190, scholars: ['图灵', '凯文·凯利'] },
        { name: '异化峰', x: 832, y: 200, scholars: ['马克思', '乔布斯'] }
      ]
    },

    历史山: {
      type: 'mountain',
      x: 500, // 500 + 360*cos(90°) = 500
      y: 760, // 400 + 360*sin(90°) = 760
      size: 65,
      color: '#DEB887',
      discovered: false,
      peaks: [
        { name: '中国史峰', x: 480, y: 740, scholars: ['司马迁', '钱穆'] },
        { name: '世界史峰', x: 500, y: 730, scholars: ['汤因比', '布罗代尔'] },
        { name: '断代史峰', x: 520, y: 740, scholars: ['陈寅恪', '余英时'] }
      ]
    }
  };

  // 鼠标事件处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      setPanX(prev => prev + deltaX);
      setPanY(prev => prev + deltaY);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 点击山峰
  const handleMountainClick = useCallback((e: React.MouseEvent, mountainName: string, mountain: any) => {
    e.stopPropagation();
    if (discoveredAreas.includes(mountainName)) {
      setSelectedLocation({ name: mountainName, ...mountain });
    }
  }, [discoveredAreas]);

  // 点击学者
  const handleScholarClick = useCallback((e: React.MouseEvent, scholar: string, mountainName: string) => {
    e.stopPropagation();
    setShowScholar({ scholar, mountain: mountainName });
    setScore(prev => prev + 5);
  }, []);

  // 探索新区域
  const discoverArea = useCallback((e: React.MouseEvent, areaName: string) => {
    e.stopPropagation();
    if (!discoveredAreas.includes(areaName)) {
      setDiscoveredAreas(prev => [...prev, areaName]);
      setScore(prev => prev + 20);
    }
  }, [discoveredAreas]);

  // 工具栏功能
  const zoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.2, 3)), []);
  const zoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.2, 0.5)), []);
  const resetView = useCallback(() => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, []);

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom right, #f7fafc, #e2e8f0)', overflow: 'hidden', position: 'relative' }}>
      {/* 顶部工具栏 */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        background: 'linear-gradient(to right, rgba(31, 41, 55, 0.9), rgba(55, 65, 81, 0.9))', 
        backdropFilter: 'blur(4px)', 
        color: 'white', 
        padding: '1rem' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>智慧山水图</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star style={{ color: '#fbbf24' }} size={16} />
              <span>智慧: {score}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mountain style={{ color: '#60a5fa' }} size={16} />
              <span>已探索: {discoveredAreas.length}/{Object.keys(mapElements).length}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={zoomIn}
              style={{ padding: '0.5rem', background: '#4b5563', border: 'none', borderRadius: '0.25rem', color: 'white', cursor: 'pointer' }}
            >
              <ZoomIn size={16} />
            </button>
            <button 
              onClick={zoomOut}
              style={{ padding: '0.5rem', background: '#4b5563', border: 'none', borderRadius: '0.25rem', color: 'white', cursor: 'pointer' }}
            >
              <ZoomOut size={16} />
            </button>
            <button 
              onClick={resetView}
              style={{ padding: '0.5rem', background: '#4b5563', border: 'none', borderRadius: '0.25rem', color: 'white', cursor: 'pointer' }}
            >
              <Home size={16} />
            </button>
            <button 
              onClick={() => setShowHelp(!showHelp)}
              style={{ padding: '0.5rem', background: '#2563eb', border: 'none', borderRadius: '0.25rem', color: 'white', cursor: 'pointer' }}
            >
              <BookOpen size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 主地图区域 */}
      <div 
        style={{ width: '100%', height: '100%', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg 
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            filter: 'sepia(10%) saturate(80%)'
          }}
          viewBox="0 0 1000 800"
        >
          {/* 背景 */}
          <rect width="1000" height="800" fill="#f8f6f0" />

          {/* 绘制太阳轨道 */}
          <ellipse
            cx={mapElements.太阳山.x}
            cy={mapElements.太阳山.y}
            rx="140"
            ry="90"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.3"
          />

          {/* 第一层外围椭圆 - 人性、身体、信仰山 */}
          <ellipse
            cx={mapElements.太阳山.x}
            cy={mapElements.太阳山.y}
            rx="180"
            ry="180"
            fill="none"
            stroke="#BA55D3"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.5"
          />

          {/* 第二层外围椭圆 - 社会、家庭、组织山 */}
          <ellipse
            cx={mapElements.太阳山.x}
            cy={mapElements.太阳山.y}
            rx="260"
            ry="260"
            fill="none"
            stroke="#98FB98"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.5"
          />

          {/* 第三层外围椭圆 - 世界、时代、历史山 */}
          <ellipse
            cx={mapElements.太阳山.x}
            cy={mapElements.太阳山.y}
            rx="360"
            ry="360"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.5"
          />

          {/* 绘制河流 */}
          {mapElements.太阳山.rivers.map((river: any, idx: number) => (
            <g key={idx}>
              <line
                x1={river.startX}
                y1={river.startY}
                x2={river.endX}
                y2={river.endY}
                stroke="#6699cc"
                strokeWidth="3"
                opacity="0.7"
                strokeDasharray="5,5"
              />
              <text
                x={(river.startX + river.endX) / 2}
                y={(river.startY + river.endY) / 2 - 10}
                fill="#4a5568"
                fontSize="12"
                fontFamily="serif"
                textAnchor="middle"
              >
                {river.name}
              </text>
            </g>
          ))}

          {/* 绘制山脉 */}
          {Object.entries(mapElements).map(([name, mountain]: [string, any]) => {
            const isDiscovered = discoveredAreas.includes(name);
            
            // 计算当前山的位置
            let currentX = mountain.x;
            let currentY = mountain.y;

            // 如果是月亮山，计算公转位置
            if (name === '月亮山') {
              const sunMountain = mapElements['太阳山'];
              const orbitRadiusX = 140;
              const orbitRadiusY = 90;
              currentX = sunMountain.x + orbitRadiusX * Math.cos(moonAngle);
              currentY = sunMountain.y + orbitRadiusY * Math.sin(moonAngle);
            }

            // 检查是否在可探索范围内
            const isNearDiscovered = discoveredAreas.some(discovered => {
              const discoveredMountain = mapElements[discovered];
              let discoveredX = discoveredMountain.x;
              let discoveredY = discoveredMountain.y;
              
              // 如果已发现的是月亮山，使用其当前位置
              if (discovered === '月亮山') {
                const sunMountain = mapElements['太阳山'];
                discoveredX = sunMountain.x + 140 * Math.cos(moonAngle);
                discoveredY = sunMountain.y + 90 * Math.sin(moonAngle);
              }
              
              const distance = Math.sqrt(
                Math.pow(currentX - discoveredX, 2) + 
                Math.pow(currentY - discoveredY, 2)
              );
              return distance < 250;
            });

            return (
              <g key={name}>
                {/* 山体 */}
                <polygon
                  points={`${currentX},${currentY + mountain.size/2} ${currentX - mountain.size/2},${currentY + mountain.size/2} ${currentX - mountain.size/3},${currentY} ${currentX},${currentY - mountain.size/3} ${currentX + mountain.size/3},${currentY} ${currentX + mountain.size/2},${currentY + mountain.size/2}`}
                  fill={isDiscovered ? mountain.color : '#e0e0e0'}
                  stroke="#2d3748"
                  strokeWidth="2"
                  opacity={isDiscovered ? 0.8 : 0.3}
                  strokeDasharray={!isDiscovered ? "5,5" : "none"}
                  style={{ cursor: isDiscovered ? 'pointer' : 'not-allowed' }}
                  onClick={(e) => isDiscovered && handleMountainClick(e, name, mountain)}
                />
                
                {/* 山名 */}
                <text
                  x={currentX}
                  y={currentY + mountain.size/2 + 20}
                  fill={isDiscovered ? "#2d3748" : "#666"}
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="serif"
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  {name}
                </text>

                {/* 山峰和学者 */}
                {isDiscovered && mountain.peaks && mountain.peaks.map((peak: any, idx: number) => {
                  // 计算山峰的实际位置
                  let peakX: number, peakY: number;
                  if (name === '月亮山') {
                    // 月亮山的山峰使用相对偏移
                    peakX = currentX + peak.x;
                    peakY = currentY + peak.y;
                  } else {
                    // 其他山的山峰使用绝对位置
                    peakX = peak.x;
                    peakY = peak.y;
                  }

                  return (
                    <g key={idx}>
                      <circle
                        cx={peakX}
                        cy={peakY}
                        r="8"
                        fill="#8b4513"
                        stroke="#2d3748"
                        strokeWidth="1"
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        x={peakX}
                        y={peakY - 15}
                        fill="#2d3748"
                        fontSize="10"
                        fontFamily="serif"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {peak.name}
                      </text>
                      
                      {/* 学者标记 */}
                      {peak.scholars.map((scholar: string, scholarIdx: number) => (
                        <circle
                          key={scholarIdx}
                          cx={peakX + (scholarIdx - peak.scholars.length/2 + 0.5) * 15}
                          cy={peakY + 20}
                          r="5"
                          fill="#ff6b6b"
                          stroke="#2d3748"
                          strokeWidth="1"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleScholarClick(e, scholar, name)}
                        />
                      ))}
                    </g>
                  );
                })}

                {/* 未发现区域的探索按钮 */}
                {!isDiscovered && isNearDiscovered && (
                  <g>
                    <circle
                      cx={currentX}
                      cy={currentY - 10}
                      r="25"
                      fill="#ffd700"
                      opacity="0.8"
                      stroke="#ff8c00"
                      strokeWidth="3"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => discoverArea(e, name)}
                    />
                    <text
                      x={currentX}
                      y={currentY - 5}
                      fill="#2d3748"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ pointerEvents: 'none' }}
                    >
                      探索
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 帮助面板 */}
      {showHelp && (
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          zIndex: 50,
          maxWidth: '28rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>游戏说明</h3>
            <button 
              onClick={() => setShowHelp(false)}
              style={{ color: '#6b7280', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            <p>• 拖拽地图进行移动</p>
            <p>• 点击金色"探索"按钮发现新区域</p>
            <p>• 点击红色学者圆点获取智慧</p>
            <p>• 月亮山会绕着太阳山公转</p>
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #d1d5db' }}>
              <p style={{ fontWeight: '600', color: '#2563eb' }}>进度：{discoveredAreas.length}/{Object.keys(mapElements).length} 已探索</p>
            </div>
          </div>
        </div>
      )}

      {/* 侧边信息面板 */}
      {selectedLocation && (
        <div style={{
          position: 'absolute',
          top: '5rem',
          right: '1rem',
          width: '20rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          borderRadius: '0.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          zIndex: 40
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>{selectedLocation.name}</h3>
            <button 
              onClick={() => setSelectedLocation(null)}
              style={{ color: '#6b7280', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          
          {selectedLocation.peaks && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontWeight: '600', color: '#374151' }}>山峰概览：</h4>
              {selectedLocation.peaks.map((peak: any, idx: number) => (
                <div key={idx} style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.25rem' }}>
                  <div style={{ fontWeight: '500', color: '#1f2937' }}>{peak.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>
                    智者：{peak.scholars.join('、')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 学者详情弹窗 */}
      {showScholar && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '28rem',
            margin: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>{showScholar.scholar}</h3>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                background: 'linear-gradient(to bottom right, #fbbf24, #f97316)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users style={{ color: 'white' }} size={32} />
              </div>
              <p style={{ color: '#4b5563' }}>来自 {showScholar.mountain}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#059669', fontWeight: '600', marginBottom: '1rem' }}>获得 5 智慧点数！</div>
              <button 
                onClick={() => setShowScholar(null)}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                继续探索
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeMapGame;