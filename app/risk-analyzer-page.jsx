export default function RiskAnalyzerPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Risk Analyzer | six50</title>
        <meta name="description" content="Assess your organization's readiness for the AI era" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%);
            color: #e2e8f0;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
          }

          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-top: 20px;
          }

          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #c9a961;
            font-weight: 700;
          }

          .header p {
            font-size: 1.1em;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto;
          }

          .tool-container {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(201, 169, 97, 0.2);
            border-radius: 12px;
            padding: 40px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }

          .form-section {
            margin-bottom: 30px;
          }

          .form-section h2 {
            font-size: 1.3em;
            color: #c9a961;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .form-section h3 {
            font-size: 1em;
            color: #e2e8f0;
            margin-top: 15px;
            margin-bottom: 10px;
          }

          .form-group {
            margin-bottom: 15px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            color: #cbd5e1;
            font-size: 0.95em;
            font-weight: 500;
          }

          input[type="text"],
          input[type="email"],
          input[type="number"],
          select {
            width: 100%;
            padding: 12px;
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(201, 169, 97, 0.3);
            border-radius: 6px;
            color: #e2e8f0;
            font-size: 1em;
            transition: all 0.3s ease;
          }

          input[type="text"]:focus,
          input[type="email"]:focus,
          input[type="number"]:focus,
          select:focus {
            outline: none;
            border-color: #c9a961;
            background: rgba(30, 41, 59, 1);
            box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1);
          }

          .checkbox-group {
            display: grid;
            gap: 12px;
          }

          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: #c9a961;
          }

          .radio-group {
            display: grid;
            gap: 12px;
            margin-top: 10px;
          }

          .radio-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          input[type="radio"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: #c9a961;
          }

          .collapsible {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(201, 169, 97, 0.2);
            border-radius: 6px;
            padding: 15px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            margin-bottom: 15px;
          }

          .collapsible:hover {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(201, 169, 97, 0.4);
          }

          .collapsible h3 {
            margin: 0;
            color: #e2e8f0;
            font-size: 1em;
          }

          .chevron {
            transition: transform 0.3s ease;
            color: #c9a961;
          }

          .collapsible.open .chevron {
            transform: rotate(180deg);
          }

          .collapse-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }

          .collapse-content.open {
            max-height: 1000px;
          }

          .content-inner {
            padding: 20px 0;
          }

          .scoring-display {
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid rgba(201, 169, 97, 0.3);
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            text-align: center;
          }

          .score-box {
            margin-bottom: 20px;
          }

          .score-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #c9a961;
            margin-bottom: 10px;
          }

          .score-label {
            font-size: 0.95em;
            color: #94a3b8;
            margin-bottom: 8px;
          }

          .readiness-level {
            font-size: 1.3em;
            font-weight: 600;
            padding: 12px;
            border-radius: 6px;
            display: inline-block;
            margin-top: 15px;
          }

          .readiness-level.prepared {
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
            border: 1px solid rgba(34, 197, 94, 0.5);
          }

          .readiness-level.developing {
            background: rgba(251, 191, 36, 0.2);
            color: #fde047;
            border: 1px solid rgba(251, 191, 36, 0.5);
          }

          .readiness-level.under-prepared {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.5);
          }

          .readiness-level.critical {
            background: rgba(239, 68, 68, 0.3);
            color: #ff6b6b;
            border: 1px solid rgba(239, 68, 68, 0.8);
          }

          .progress-bar {
            height: 8px;
            background: rgba(201, 169, 97, 0.2);
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
          }

          .progress-fill {
            height: 100%;
            background: #c9a961;
            transition: width 0.3s ease;
          }

          button {
            background: linear-gradient(135deg, #c9a961 0%, #b8925e 100%);
            color: #0f172a;
            padding: 14px 32px;
            border: none;
            border-radius: 6px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 20px;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(201, 169, 97, 0.3);
          }

          button:active {
            transform: translateY(0);
          }

          .success-message {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid rgba(34, 197, 94, 0.5);
            color: #86efac;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
            display: none;
            text-align: center;
          }

          .success-message.show {
            display: block;
          }

          .error-message {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.5);
            color: #fca5a5;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
            display: none;
          }

          .error-message.show {
            display: block;
          }

          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }

          @media (max-width: 768px) {
            .grid-2 {
              grid-template-columns: 1fr;
            }

            .header h1 {
              font-size: 1.8em;
            }

            .tool-container {
              padding: 20px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>AI Risk Analyzer</h1>
            <p>Assess your organization's readiness to navigate risks in the AI era</p>
          </div>

          <div className="tool-container">
            <form id="riskForm">
              {/* Your Information Section */}
              <div className="form-section">
                <h2>📋 Your Information</h2>

                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="founderName">Your Name</label>
                    <input type="text" id="founderName" name="founderName" required />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="revenueRange">Annual Revenue</label>
                    <select id="revenueRange" name="revenueRange" required>
                      <option value="">Select a range</option>
                      <option value="under-1m">&lt; $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-10m">$5M - $10M</option>
                      <option value="10m-25m">$10M - $25M</option>
                      <option value="25m-50m">$25M - $50M</option>
                      <option value="50m-100m">$50M - $100M</option>
                      <option value="over-100m">&gt; $100M</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Sections */}
              <div className="form-section">
                <h2>🎯 Risk Assessment</h2>

                {/* Job Displacement Section */}
                <div className="collapsible" onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle('open')}>
                  <h3>1. Job Displacement Risk (40%)</h3>
                  <span className="chevron">▼</span>
                </div>
                <div className="collapse-content">
                  <div className="content-inner">
                    <h3>What percentage of your entry-level roles could be automated?</h3>
                    <div className="form-group">
                      <input type="range" id="entryLevel" name="entryLevel" min="0" max="100" defaultValue="0" />
                      <div style={{textAlign: 'center', marginTop: '10px', color: '#c9a961', fontSize: '1.2em'}}>
                        <span id="entryLevelValue">0</span>%
                      </div>
                    </div>

                    <h3>Which CS/Operations roles are at risk?</h3>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input type="checkbox" id="cs" name="automatable_cs" />
                        <label htmlFor="cs">Customer Success roles could be partially automated</label>
                      </div>
                      <div className="checkbox-item">
                        <input type="checkbox" id="acct" name="automatable_acct" />
                        <label htmlFor="acct">Accounting/Finance roles could be partially automated</label>
                      </div>
                      <div className="checkbox-item">
                        <input type="checkbox" id="dev" name="automatable_dev" />
                        <label htmlFor="dev">Development roles could be partially automated</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Governance Section */}
                <div className="collapsible" onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle('open')}>
                  <h3>2. Governance & Harm Capacity Risk (30%)</h3>
                  <span className="chevron">▼</span>
                </div>
                <div className="collapse-content">
                  <div className="content-inner">
                    <h3>Governance Readiness</h3>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input type="checkbox" id="policy" name="gov_policy" />
                        <label htmlFor="policy">Have an AI/automation policy in place</label>
                      </div>
                      <div className="checkbox-item">
                        <input type="checkbox" id="audit" name="gov_audit" />
                        <label htmlFor="audit">Conduct regular audits of AI systems</label>
                      </div>
                      <div className="checkbox-item">
                        <input type="checkbox" id="fair" name="gov_fair" />
                        <label htmlFor="fair">Have fairness/bias assessment processes</label>
                      </div>
                    </div>

                    <h3>Learning & Development Focus</h3>
                    <div className="radio-group">
                      <div className="radio-item">
                        <input type="radio" id="ld-none" name="ld_program" value="none" required />
                        <label htmlFor="ld-none">No formal AI/automation L&D program</label>
                      </div>
                      <div className="radio-item">
                        <input type="radio" id="ld-basic" name="ld_program" value="basic" />
                        <label htmlFor="ld-basic">Basic training available</label>
                      </div>
                      <div className="radio-item">
                        <input type="radio" id="ld-comprehensive" name="ld_program" value="comprehensive" />
                        <label htmlFor="ld-comprehensive">Comprehensive L&D program in place</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capability Risk Section */}
                <div className="collapsible" onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle('open')}>
                  <h3>3. Critical Capability Risk (30%)</h3>
                  <span className="chevron">▼</span>
                </div>
                <div className="collapse-content">
                  <div className="content-inner">
                    <p style={{color: '#94a3b8', marginBottom: '15px'}}>
                      Assess your organization's capacity to identify and respond to advanced risks in emerging AI systems.
                    </p>
                    <div className="radio-group">
                      <div className="radio-item">
                        <input type="radio" id="cap-none" name="capability_level" value="none" required />
                        <label htmlFor="cap-none">No formal assessment process</label>
                      </div>
                      <div className="radio-item">
                        <input type="radio" id="cap-basic" name="capability_level" value="basic" />
                        <label htmlFor="cap-basic">Ad hoc assessment when needed</label>
                      </div>
                      <div className="radio-item">
                        <input type="radio" id="cap-formal" name="capability_level" value="formal" />
                        <label htmlFor="cap-formal">Formal assessment & response framework</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring Display */}
              <div className="scoring-display">
                <div className="score-box">
                  <div className="score-label">Your Readiness Index</div>
                  <div className="score-value" id="overallScore">0</div>
                  <div className="progress-bar">
                    <div className="progress-fill" id="progressFill" style={{width: '0%'}}></div>
                  </div>
                  <div className="readiness-level" id="readinessLevel" style={{opacity: 0.5}}>
                    Complete assessment to see results
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Get Your Assessment</button>

              <div className="success-message" id="successMessage">
                ✓ Your assessment has been submitted successfully!
              </div>
              <div className="error-message" id="errorMessage"></div>
            </form>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          // Range input handler
          const entryLevelInput = document.getElementById('entryLevel');
          const entryLevelValue = document.getElementById('entryLevelValue');
          
          if (entryLevelInput) {
            entryLevelInput.addEventListener('input', (e) => {
              entryLevelValue.textContent = e.target.value;
              calculateScore();
            });
          }

          function calculateScore() {
            const entryLevel = parseInt(document.getElementById('entryLevel')?.value || 0);
            const csAutomatable = document.getElementById('cs')?.checked ? 1 : 0;
            const acctAutomatable = document.getElementById('acct')?.checked ? 1 : 0;
            const devAutomatable = document.getElementById('dev')?.checked ? 1 : 0;
            
            const govPolicy = document.getElementById('policy')?.checked ? 1 : 0;
            const govAudit = document.getElementById('audit')?.checked ? 1 : 0;
            const govFair = document.getElementById('fair')?.checked ? 1 : 0;
            const ldProgram = document.querySelector('input[name="ld_program"]:checked')?.value || 'none';
            
            const capabilityLevel = document.querySelector('input[name="capability_level"]:checked')?.value || 'none';

            // Displacement Score (40% weight)
            const automationCount = csAutomatable + acctAutomatable + devAutomatable;
            const displacementBase = Math.min(entryLevel + (automationCount * 25), 100);
            const displacementScore = Math.round(displacementBase * 0.4);

            // Governance Score (30% weight)
            let govBase = 100;
            govBase -= (govPolicy ? 0 : 33);
            govBase -= (govAudit ? 0 : 33);
            govBase -= (govFair ? 0 : 34);
            
            const ldBonus = ldProgram === 'comprehensive' ? 30 : ldProgram === 'basic' ? 15 : 0;
            const governanceScore = Math.round((100 - govBase + ldBonus) * 0.3);

            // Capability Score (30% weight)
            let capBase = 100;
            if (capabilityLevel === 'none') capBase = 20;
            else if (capabilityLevel === 'basic') capBase = 60;
            else if (capabilityLevel === 'formal') capBase = 95;
            const capabilityScore = Math.round(capBase * 0.3);

            // Overall Score
            const overallScore = displacementScore + governanceScore + capabilityScore;

            // Update display
            document.getElementById('overallScore').textContent = overallScore;
            document.getElementById('progressFill').style.width = overallScore + '%';

            // Set readiness level
            let level = '';
            let className = '';
            if (overallScore >= 80) {
              level = 'Prepared';
              className = 'prepared';
            } else if (overallScore >= 60) {
              level = 'Developing';
              className = 'developing';
            } else if (overallScore >= 40) {
              level = 'Under-Prepared';
              className = 'under-prepared';
            } else {
              level = 'Critical';
              className = 'critical';
            }
            
            const readinessLevelEl = document.getElementById('readinessLevel');
            readinessLevelEl.textContent = level + ' (' + overallScore + '/100)';
            readinessLevelEl.className = 'readiness-level ' + className;
          }

          // Add listeners to all form inputs
          document.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('change', calculateScore);
            el.addEventListener('input', calculateScore);
          });

          // Form submission
          document.getElementById('riskForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
              const response = await fetch('/.netlify/functions/submit-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });

              if (response.ok) {
                document.getElementById('successMessage').classList.add('show');
                document.getElementById('errorMessage').classList.remove('show');
                e.target.reset();
                calculateScore();
                setTimeout(() => {
                  document.getElementById('successMessage').classList.remove('show');
                }, 3000);
              } else {
                throw new Error('Server error');
              }
            } catch (error) {
              document.getElementById('errorMessage').textContent = 'Error submitting assessment. Please try again.';
              document.getElementById('errorMessage').classList.add('show');
            }
          });

          // Initial calculation
          calculateScore();
        `}} />
      </body>
    </html>
  );
}
