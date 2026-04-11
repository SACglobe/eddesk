/**
 * transactional email utility for eddesk
 * using resend api with table-based layout for wide client compatibility
 */

export interface AdmissionEmailData {
  schoolname: string;
  studentname: string;
  seekingclass: string;
  mobileno: string;
  date: string;
}

export async function sendAdmissionEmail(to: string, data: AdmissionEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("[email.util] error: RESEND_API_KEY is not configured");
    return { success: false, error: "Configuration missing" };
  }

  const adminUrl = "https://admin.eddesk.in";
  const companyUrl = "https://eddesk.in";
  // using a stable absolute path for the logo
  const logoUrl = "https://admin.eddesk.in/logo-full.png";

  const subject = `New Admission Application - ${data.studentname} - EdDesk`;
  const sender = "EdDesk Admission <admission@eddesk.in>";
  const headerBg = "#059669"; // Emerald/Success theme
  const badge = "New Application";

  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${subject}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 40px 0 40px 0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                
                <!-- HEADER -->
                <tr>
                  <td align="center" bgcolor="${headerBg}" style="padding: 40px 40px 40px 40px;">
                    <img src="${logoUrl}" alt="EdDesk" width="160" style="display: block; filter: brightness(0) invert(1);" />
                    <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                      <tr>
                        <td align="center" style="border-radius: 100px; background-color: rgba(255,255,255,0.2); padding: 4px 16px; border: 1px solid rgba(255,255,255,0.4);">
                          <span style="color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">${badge}</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 20px 0 0 0;">Application Received</h1>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 40px 40px 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="color: #1e293b; font-size: 16px; line-height: 24px; text-align: center; padding-bottom: 30px;">
                          Hi ${data.schoolname}, a new admission application has been submitted through your website portal.
                        </td>
                      </tr>
                      
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                            <tr>
                              <td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f8fafc;">Student Name</td>
                              <td align="right" style="color: #1e293b; font-size: 14px; font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f8fafc;">${data.studentname}</td>
                            </tr>
                            <tr>
                              <td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f8fafc;">Seeking Class</td>
                              <td align="right" style="color: #1e293b; font-size: 14px; font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f8fafc;">${data.seekingclass}</td>
                            </tr>
                            <tr>
                              <td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f8fafc;">Contact Number</td>
                              <td align="right" style="color: #1e293b; font-size: 14px; font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f8fafc;">${data.mobileno}</td>
                            </tr>
                            <tr>
                              <td style="color: #64748b; font-size: 14px; padding: 12px 0;">Submission Date</td>
                              <td align="right" style="color: #1e293b; font-size: 14px; font-weight: 700; padding: 12px 0;">${data.date}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- ACTIONS -->
                      <tr>
                        <td style="padding: 40px 0 0 0;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#0f172a" style="border-radius: 8px;">
                                <a href="${adminUrl}" style="display: inline-block; padding: 16px 24px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; width: 80%;">View Full Application</a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding-top: 16px;">
                                <p style="margin: 0; color: #94a3b8; font-size: 12px;">Login to EdDesk Admin Panel to review documents and complete the process.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td bgcolor="#f8fafc" style="padding: 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #0f172a; font-size: 14px; font-weight: 700;">EdDesk Platform</p>
                    <p style="margin: 8px 0 20px 0; color: #64748b; font-size: 13px;">Empowering Schools, Transforming Education.</p>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 0 0 20px 0;">
                          <a href="${companyUrl}" style="color: #2563eb; text-decoration: none; font-weight: 600; font-size: 13px;">eddesk.in</a>
                          <span style="color: #cbd5e1; padding: 0 10px;">|</span>
                          <a href="https://tech.sacglobe.com" style="color: #64748b; text-decoration: none; font-weight: 600; font-size: 13px;">SAC Globe Tech</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                      &copy; ${new Date().getFullYear()} EdDesk &bull; A product of <a href="https://tech.sacglobe.com" style="color: #94a3b8; text-decoration: underline;">SAC Globe Tech</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("[email.util] resend api error:", result);
      return { success: false, error: result.message };
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("[email.util] internal error:", error);
    return { success: false, error: error.message };
  }
}
