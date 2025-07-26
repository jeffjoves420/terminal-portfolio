    document.addEventListener('DOMContentLoaded', () => {
      // DOM Elements
      const output = document.getElementById('output');
      const input = document.getElementById('commandInput');
      const promptEl = document.getElementById('prompt');
      const cursor = document.getElementById('cursor');
      
      // State management
      let history = [];
      let histIndex = -1;
      let hasRun = false;
      let idleTimer;
      let currentDirectory = '~';

      // Constants
      const RESUME_URL = 'https://github.com/jeffjoves420/resume/blob/main/Jeff%20D.%20Joves%20-%20%20Data%20Analyst.pdf';
      const RESUME_FILENAME = 'Jeff_Joves_Resume.pdf';
      const STATIC_ANALYSIS_TEXT = `Bullish pennant formation. Support at $58,500. Target $110,000.`;

      // Complete commands with all features
      const commands = {
        help: {
          description: "Display available commands",
          execute: () => {
            return `
<span class="info">Available Commands:</span>

<ul>
  <li><span class="highlight">Core Commands:</span>
    <ul>
      <li><span class="link" onclick="executeCommand('about')">about</span> - About me</li>
      <li><span class="link" onclick="executeCommand('skills')">skills</span> - My technical skills</li>
      <li><span class="link" onclick="executeCommand('projects')">projects</span> - My projects</li>
      <li><span class="link" onclick="executeCommand('experience')">experience</span> - My work experience</li>
      <li><span class="link" onclick="executeCommand('contact')">contact</span> - Contact information</li>
      <li><span class="link" onclick="executeCommand('download')">download</span> - Download my resume</li>
    </ul>
  </li>
  
  <li><span class="highlight">Data Analysis:</span>
    <ul>
      <li><span class="link" onclick="executeCommand('query')">query</span> - Example SQL queries</li>
      <li><span class="link" onclick="executeCommand('analyze')">analyze</span> - BTC trading analysis</li>
      <li><span class="link" onclick="executeCommand('btc')">btc</span> - Bitcoin price data</li>
    </ul>
  </li>
  
  <li><span class="highlight">System:</span>
    <ul>
      <li><span class="link" onclick="executeCommand('clear')">clear</span> - Clear terminal</li>
      <li><span class="link" onclick="executeCommand('theme')">theme</span> - Change terminal theme</li>
    </ul>
  </li>
</ul>
            `;
          }
        },
        
        about: {
          description: "About Jeff Joves",
          execute: () => {
            return `
<span class="info">Jeff Joves - Data Analyst</span>

<div class="trading-analysis">
  <h3>Professional Summary</h3>
  <ul>
    <li>Data Analyst with expertise in SQL, Python, and Data Visualization</li>
    <li>Experience in root cause analysis and quality improvement</li>
    <li>Skilled in transforming complex data into actionable insights</li>
    <li>Passionate about data-driven decision making</li>
  </ul>
</div>

<span class="info">Education & Certifications</span>
<ul>
  <li>Bachelor's Degree in Computer Engineering</li>
  <li>Stanford Online (Supervised Machine Learning: Regression and
Classification ) </li>
  <li> Microsoft Certified: Azure AI Fundamentals</li>
</ul>
            `;
          }
        },
        
        skills: {
          description: "My technical skills",
          execute: () => {
            return `
<span class="info">Technical Skills</span>

<div class="trading-analysis">
  <h3>Data Analysis</h3>
  <ul>
    <li>SQL - (Complex queries, Optimization, Window functions)</li>
    <li>Python - (Pandas, NumPy, Matplotlib, Scikit-learn)</li>
    <li>Data Visualization -  (MS Excel Dashboard, Power BI, Plotly)</li>
    <li>Statistical Analysis - (Regression, Hypothesis testing)</li>
  </ul>
  
  <h3>Web Development</h3>
  <ul>
    <li>JavaScript - ( Basic React and Node.js)</li>
    <li>HTML/CSS - (Responsive design, CSS preprocessors)</li>
  </ul>
  
  <h3>Other Skills</h3>
  <ul>
    <li>Linux - (Bash scripting, system administration)</li>
    <li>Git - Advanced (Version control, CI/CD pipelines)</li>
    <li>Financial Analysis - (Technical analysis (Stocks and Crypto), algorithmic trading)</li>
  </ul>
</div>
            `;
          }
        },
        
        experience: {
          description: "My work experience",
          execute: () => {
            return `
<span class="info">Work Experience</span>

<div class="experience-item">
  <h3><span class="company">Sanyo Denki Philippines Inc.</span> - <span class="position">Failure / Data Analysis Engineer</span></h3>
  <ul>
    <li>Analyzed large datasets from failure reports to uncover trends and root causes, delivering actionable insights that informed process and quality improvements.</li>
    <li>Developed clear, impactful visualizations and dashboards to support data-driven decision-making and highlight key operational issues.</li>
    <li>Conducted thorough Root Cause Analysis (RCA) using data modeling and simulations to identify failure mechanisms and support effective corrective actions.</li>
    <li>Compiled, organized, and summarized failure data, identifying recurring patterns to support continuous improvement initiatives.</li>
    <li>Monitored quality metrics to ensure product compliance with specifications, using data to proactively identify and address potential quality risks.</li>
    <li>Collaborated cross-functionally with customer claims, engineering, and materials teams to communicate data findings and drive cross-departmental quality enhancements.</li>
  </ul>
</div>
            `;
          }
        },
        
        projects: {
          description: "My projects",
          execute: () => {
            return `
<span class="info">Projects</span>

<div class="trading-analysis">
  <h3>BTC Pump Predictor</h3>
  <p>Web app predicting Bitcoin prices using Mahalanobis distance and moving averages</p>
  <p><strong>Technologies:</strong> Python, JavaScript, Binance API</p>
  <p><a href="https://jeffjoves420.github.io/btcdpump" target="_blank" class="link">Live Demo</a></p>
</div>

<div class="trading-analysis">
  <h3>Japanese Workplace Translator</h3>
  <p>Simple translator for workplace communication with Japanese superiors</p>
  <p><strong>Technologies:</strong> JavaScript, HTML/CSS, Google Translate API</p>
  <p><a href="https://jeffkaiwa.netlify.app" target="_blank" class="link">Live Demo</a></p>
</div>

<div class="trading-analysis">
  <h3>JeffGPT AI Assistant</h3>
  <p>Custom AI chatbot wrapper with personalized responses</p>
  <p><strong>Technologies:</strong> Python, OpenAI API, Flask</p>
  <p><a href="https://jeffgpt.onrender.com" target="_blank" class="link">Live Demo</a></p>
</div>
            `;
          }
        },
        
        contact: {
          description: "Contact information",
          execute: () => {
            return `
<span class="info">Contact Information</span>

<div class="trading-analysis">
  <ul>
    <li>📧 <span class="link" onclick="navigator.clipboard.writeText('https://jeffjoves-portfolio.vercel.app/')">https://jeffjoves-portfolio.vercel.app/</span></li>
    <li>📞 +63461367167</li>
    <li>🌐 <a href="https://www.linkedin.com/in/jeff-alvin-joves/" target="_blank" class="link">https://www.linkedin.com/in/jeff-alvin-joves/</a></li>
    <li>🐙 <a href="https://github.com/jeffjoves420" target="_blank" class="link">https://github.com/jeffjoves420</a></li>
  </ul>
  
  <h3>Availability</h3>
  <ul>
    <li>Open to data analyst and junior developer roles</li>
    <li>Available for freelance projects</li>
    <li>Based in Philippines, (Remote work available)</li>
  </ul>
</div>
            `;
          }
        },
        
        download: {
          description: "Download my resume",
          execute: () => {
            try {
              const link = document.createElement('a');
              link.href = RESUME_URL;
              link.download = RESUME_FILENAME;
              link.target = '_blank';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              return `
                <span class="success">Starting resume download...</span>
                <div class="download-section">
                  <p>If the download doesn't start automatically:</p>
                  <ul>
                    <li><a href="${RESUME_URL}" download="${RESUME_FILENAME}" class="link">Click here to download</a></li>
                    <li>Right-click the link and select "Save link as"</li>
                    <li>Check your browser's downloads folder</li>
                  </ul>
                </div>
              `;
            } catch (err) {
              return `
                <span class="error">Failed to automatically download resume</span>
                <div class="download-section">
                  <p>Please download it manually:</p>
                  <a href="${RESUME_URL}" download="${RESUME_FILENAME}" class="link">Download Resume</a>
                </div>
              `;
            }
          }
        },

        analyze: {
          description: "Perform BTC trading analysis",
          execute: async () => {
            appendText("<span class='info'>Fetching real-time BTC data...</span>");
            
            try {
              // Fetch current price data
              const priceResp = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
              const priceData = await priceResp.json();
              
              // Calculate important levels
              const currentPrice = parseFloat(priceData.lastPrice);
              const dayHigh = parseFloat(priceData.highPrice);
              const dayLow = parseFloat(priceData.lowPrice);
              const priceChange = parseFloat(priceData.priceChangePercent).toFixed(2);
              const supportLevel = (dayLow * 0.995).toFixed(2);
              const resistanceLevel = (dayHigh * 1.005).toFixed(2);
              
              // Determine market sentiment
              const changeClass = priceChange >= 0 ? 'success' : 'error';
              
              return `
<span class="info">BTC/USDT Analysis - ${new Date().toLocaleString()}</span>

<div class="trading-analysis">
  <h3>Current Market Data</h3>
  <ul>
    <li>Price: <span class="highlight">$${currentPrice.toFixed(2)}</span></li>
    <li>24h Change: <span class="${changeClass}">${priceChange}%</span></li>
    <li>24h High: $${dayHigh.toFixed(2)}</li>
    <li>24h Low: $${dayLow.toFixed(2)}</li>
    <li>Volume: ${parseFloat(priceData.volume).toFixed(2)} BTC</li>
  </ul>

  <h3>Technical Analysis</h3>
  <img src="https://www.tradingview.com/x/gey1zwSd/" alt="BTC Technical Analysis">
  
  <h3>Key Levels</h3>
  <ul>
    <li>Support: $${supportLevel}</li>
    <li>Resistance: $${resistanceLevel}</li>
    <li>Risk/Reward Ratio: 1:3.5 (calculated)</li>
  </ul>

  <h3>Trading Recommendations</h3>
  <ul>
    <li>${getRecommendation(currentPrice, priceChange)}</li>
    <li>Consider stop-loss at $${supportLevel}</li>
    <li>Potential take-profit at $${resistanceLevel}</li>
  </ul>

  <p class="warning">Note: This is not financial advice. Always do your own research.</p>
</div>
              `;
            } catch (err) {
              return `
<span class="error">Failed to fetch real-time data</span>
<div class="trading-analysis">
  <p>Using cached analysis:</p>
  <img src="https://www.tradingview.com/x/gey1zwSd/" alt="BTC Technical Analysis">
  <p>${STATIC_ANALYSIS_TEXT}</p>
</div>
              `;
            }
          }
        },

        btc: {
          description: "Get Bitcoin price data",
          execute: async () => {
            appendText("<span class='info'>Fetching BTC price data...</span>");
            
            try {
              const priceResp = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
              const priceData = await priceResp.json();
              const currentPrice = parseFloat(priceData.lastPrice).toFixed(2);
              const priceChange = parseFloat(priceData.priceChangePercent).toFixed(2);
              const changeClass = priceChange >= 0 ? 'success' : 'error';
              
              return `
<span class="info">Bitcoin (BTC/USDT)</span>

<ul>
  <li>Current Price: <span class="highlight">$${currentPrice}</span></li>
  <li>24h Change: <span class="${changeClass}">${priceChange}%</span></li>
  <li>24h High: $${parseFloat(priceData.highPrice).toFixed(2)}</li>
  <li>24h Low: $${parseFloat(priceData.lowPrice).toFixed(2)}</li>
  <li>24h Volume: ${parseFloat(priceData.volume).toFixed(2)} BTC</li>
</ul>

<span class="info">Run <span class="link" onclick="executeCommand('analyze')">analyze</span> for detailed trading analysis</span>
              `;
            } catch (err) {
              return `<span class="error">Error fetching BTC data: ${err.message}</span>`;
            }
          }
        },

        query: {
          description: "Example SQL queries",
          execute: (args) => {
            if (!args.length) {
              return `
<span class="info">Sample SQL Queries:</span>

<ul>
  <li><span class="link" onclick="executeCommand('query sales')">query sales</span> - Sales data analysis</li>
  <li><span class="link" onclick="executeCommand('query users')">query users</span> - User behavior analysis</li>
  <li><span class="link" onclick="executeCommand('query inventory')">query inventory</span> - Inventory management</li>
</ul>
              `;
            }
            
            const queryType = args[0].toLowerCase();
            
            if (queryType === 'sales') {
              return `
<span class="info">Sales Analysis Query:</span>

<pre>
SELECT 
  region,
  DATE_TRUNC('month', order_date) AS month,
  SUM(amount) AS total_sales,
  COUNT(DISTINCT customer_id) AS unique_customers,
  SUM(amount) / COUNT(DISTINCT customer_id) AS avg_spend
FROM sales
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY 1, 2
ORDER BY 1, 2;
</pre>

<span class="info">Query Results (Sample):</span>

<table>
  <tr>
    <th>Region</th>
    <th>Month</th>
    <th>Total Sales</th>
    <th>Customers</th>
    <th>Avg Spend</th>
  </tr>
  <tr>
    <td>North</td>
    <td>2023-01-01</td>
    <td>$42,189</td>
    <td>124</td>
    <td>$340.23</td>
  </tr>
  <tr>
    <td>North</td>
    <td>2023-02-01</td>
    <td>$38,756</td>
    <td>115</td>
    <td>$336.96</td>
  </tr>
</table>
              `;
            } else if (queryType === 'inventory') {
              return `
<span class="info">Inventory Management Query:</span>

<pre>
WITH inventory_turns AS (
  SELECT
    product_id,
    product_name,
    SUM(quantity_sold) AS total_sold,
    AVG(inventory_count) AS avg_inventory,
    SUM(quantity_sold) / AVG(inventory_count) AS turnover_ratio
  FROM inventory
  WHERE date BETWEEN '2023-01-01' AND '2023-12-31'
  GROUP BY 1, 2
)

SELECT
  product_name,
  total_sold,
  ROUND(avg_inventory, 2) AS avg_inventory,
  ROUND(turnover_ratio, 2) AS turnover_ratio,
  CASE
    WHEN turnover_ratio < 1 THEN 'Low Turnover'
    WHEN turnover_ratio BETWEEN 1 AND 3 THEN 'Medium Turnover'
    ELSE 'High Turnover'
  END AS turnover_category
FROM inventory_turns
ORDER BY turnover_ratio DESC;
</pre>

<span class="info">Key Metrics:</span>
<ul>
  <li><strong>Turnover Ratio:</strong> Measures how often inventory is sold and replaced</li>
  <li><strong>High Turnover:</strong> Indicates strong sales or insufficient inventory</li>
  <li><strong>Low Turnover:</strong> May indicate overstocking or poor sales</li>
</ul>
              `;
            } else {
              return `<span class="error">Unknown query type: ${queryType}</span>`;
            }
          }
        },

        clear: {
          description: "Clear the terminal",
          execute: () => {
            output.innerHTML = '';
            hasRun = false;
            startHeader();
            return '';
          }
        },
        
        theme: {
          description: "Change terminal theme",
          execute: (args) => {
            if (!args.length) {
              return `
<span class="info">Available Themes:</span>
<ul>
  <li><span class="link" onclick="executeCommand('theme dark')">dark</span> - Default dark theme</li>
  <li><span class="link" onclick="executeCommand('theme blue')">blue</span> - Dark blue theme</li>
  <li><span class="link" onclick="executeCommand('theme matrix')">matrix</span> - Green on black</li>
  <li><span class="link" onclick="executeCommand('theme light')">light</span> - Light mode</li>
</ul>
              `;
            }
            
            const theme = args[0].toLowerCase();
            let bg, text;
            
            switch (theme) {
              case 'dark':
                bg = '#0d1117'; text = '#c9d1d9';
                break;
              case 'blue':
                bg = '#011627'; text = '#d6deeb';
                break;
              case 'matrix':
                bg = '#000000'; text = '#00ff00';
                break;
              case 'light':
                bg = '#f8f8f8'; text = '#333333';
                break;
              default:
                return `<span class="error">Unknown theme: ${theme}</span>`;
            }
            
            document.documentElement.style.setProperty('--bg-color', bg);
            document.documentElement.style.setProperty('--text-color', text);
            return `<span class="success">Theme set to ${theme}</span>`;
          }
        }
      };

      // Helper functions
      function getRecommendation(price, change) {
        if (change > 5) return "Consider taking profits as price has risen significantly";
        if (change < -5) return "Potential buying opportunity after significant drop";
        return "Market appears balanced - consider range-bound strategies";
      }

      // Initialize terminal
      function init() {
        startHeader();
        setupEventListeners();
        input.focus();
      }

      // Start with header message
      function startHeader() {
        const container = document.createElement('div');
        container.className = 'command-output';
        output.appendChild(container);
        
        const messages = [
          "Welcome to Jeff Joves' Data Analysis Terminal",
          "Type 'help' to see available commands",
          "Try 'experience' to see my work history",
          "Or 'download' to get my resume"
        ];
        
        let msgIndex = 0;
        let charIndex = 0;
        
        function typeWriter() {
          if (msgIndex < messages.length) {
            if (charIndex === 0) {
              container.innerHTML += `<div>$ <span class="typing" id="typingCursor"></span></div>`;
            }
            
            const typingLine = container.lastElementChild;
            const typingCursor = document.getElementById('typingCursor');
            
            if (charIndex < messages[msgIndex].length) {
              typingCursor.insertAdjacentText('beforebegin', messages[msgIndex].charAt(charIndex));
              charIndex++;
              setTimeout(typeWriter, Math.random() * 30 + 30);
            } else {
              typingCursor.remove();
              container.innerHTML += '<br>';
              msgIndex++;
              charIndex = 0;
              setTimeout(typeWriter, 500);
            }
          } else {
            scheduleIdle();
          }
        }
        
        typeWriter();
      }

      // Set up event listeners
      function setupEventListeners() {
        // Command input
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('keypress', handleKeyPress);
        
        // Focus/blur effects
        input.addEventListener('focus', () => {
          promptEl.style.opacity = 1;
          cursor.style.animationIterationCount = 'infinite';
        });
        
        input.addEventListener('blur', () => {
          promptEl.style.opacity = 0.7;
          cursor.style.animationIterationCount = '1';
          cursor.style.opacity = 0;
        });
      }

      // Handle key down events
      function handleKeyDown(e) {
        scheduleIdle();
        
        // Arrow up/down for history
        if (e.key === 'ArrowUp') {
          if (history.length && histIndex < history.length - 1) {
            histIndex++;
            input.value = history[histIndex];
          }
          e.preventDefault();
        } else if (e.key === 'ArrowDown') {
          if (histIndex > 0) {
            histIndex--;
            input.value = history[histIndex];
          } else {
            histIndex = -1;
            input.value = '';
          }
          e.preventDefault();
        } else if (e.key === 'Tab') {
          // Tab completion
          e.preventDefault();
          const text = input.value.trim().toLowerCase();
          if (text) {
            const matches = Object.keys(commands).filter(cmd => 
              cmd.startsWith(text)
            );
            
            if (matches.length === 1) {
              input.value = matches[0];
            } else if (matches.length > 1) {
              appendText(`\n${matches.join(' ')}`);
              promptInput();
            }
          }
        }
      }

      // Handle key press events
      async function handleKeyPress(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        
        const cmd = input.value.trim();
        if (!cmd) return;
        
        // Add to history
        history.unshift(cmd);
        histIndex = -1;
        hasRun = true;
        
        // Display command
        appendText(`<span class="prompt">${currentDirectory}$</span> ${cmd}`);
        input.value = '';
        
        // Process command
        await processCommand(cmd);
        
        // Prompt for next input
        promptInput();
        scheduleIdle();
      }

      // Process a command
      async function processCommand(cmd) {
        const parts = cmd.split(' ');
        const baseCmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        if (commands[baseCmd]) {
          try {
            const result = await commands[baseCmd].execute(args);
            if (result) {
              appendText(result);
            }
          } catch (err) {
            appendText(`<span class="error">Error executing command: ${err.message}</span>`);
          }
        } else {
          appendText(`<span class="error">Command not found: ${baseCmd}</span>`);
          appendText(`Type <span class="link" onclick="executeCommand('help')">help</span> for available commands.`);
        }
      }

      // Append text to output
      function appendText(text) {
        const container = document.createElement('div');
        container.className = 'command-output';
        container.innerHTML = text;
        output.appendChild(container);
        scrollDown();
      }

      // Scroll to bottom of output
      function scrollDown() {
        output.scrollTop = output.scrollHeight;
      }

      // Prompt for next input
      function promptInput() {
        input.focus();
      }

      // Schedule idle animation
      function scheduleIdle() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          output.classList.add('glitch');
          setTimeout(() => {
            output.classList.remove('glitch');
            scheduleIdle();
          }, 2000);
        }, 30000); // 30s
      }

      // Global function to execute commands from links
      window.executeCommand = function(cmd) {
        input.value = cmd;
        const event = new KeyboardEvent('keypress', { key: 'Enter' });
        input.dispatchEvent(event);
      };

      // Initialize the terminal
      init();
    });
