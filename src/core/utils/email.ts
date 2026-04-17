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

export interface ContactEmailData {
  schoolname: string;
  name: string;
  mobileno: string;
  email?: string;
  subject?: string;
  message: string;
  date: string;
}

export interface CallbackEmailData {
  schoolname: string;
  name: string;
  mobileno: string;
  preferreddate: string;
  date: string;
}

export interface MarketingLeadEmailData {
  schoolname?: string;
  name: string;
  email: string;
  mobileno: string;
  message: string;
  source: string;
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
                    <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 100px; padding: 12px 24px;">
                      <tr>
                        <td align="center">
                          <img src="${logoUrl}" alt="EdDesk" width="130" style="display: block;" />
                        </td>
                      </tr>
                    </table>
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

/**
 * Sends a notification email to the school when a contact form is submitted.
 */
export async function sendContactEmail(to: string, data: ContactEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email.util] error: RESEND_API_KEY is not configured for contact email");
    return { success: false, error: "Configuration missing" };
  }

  const adminUrl = "https://admin.eddesk.in";
  const logoUrl = "https://admin.eddesk.in/logo-full.png";
  const subject = `New Web Enquiry - ${data.name} - EdDesk`;
  const sender = "EdDesk Enquiry <enquiry@eddesk.in>";
  
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; margin-top: 40px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" bgcolor="#475569" style="padding: 40px;">
              <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 100px; padding: 12px 24px;">
                <tr>
                  <td align="center">
                    <img src="${logoUrl}" alt="EdDesk" width="120" style="display: block;" />
                  </td>
                </tr>
              </table>
              <h1 style="color: #ffffff; font-size: 24px; margin: 20px 0 0 0;">New Message Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">From</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.name}</td></tr>
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Mobile</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.mobileno}</td></tr>
                ${data.email ? `<tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Email</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.email}</td></tr>` : ''}
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Subject</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.subject || 'General Enquiry'}</td></tr>
                <tr><td colspan="2" style="color: #64748b; font-size: 14px; padding: 20px 0 10px 0;">Message</td></tr>
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 20px; border-radius: 12px; color: #1e293b; line-height: 1.6;">${data.message}</td></tr>
              </table>
              <div style="margin-top: 40px; text-align: center;">
                <a href="${adminUrl}" style="background-color: #0f172a; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700;">Open Admin Panel</a>
              </div>
            </td>
          </tr>
          <tr><td bgcolor="#f8fafc" style="padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">&copy; ${new Date().getFullYear()} EdDesk Platform</td></tr>
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
      console.error("[email.util] contact email resend error:", result);
      return { success: false, error: result.message };
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("[email.util] contact email internal error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a notification email to the school when a callback is requested.
 */
export async function sendCallbackEmail(to: string, data: CallbackEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, error: "Configuration missing" };

  const adminUrl = "https://admin.eddesk.in";
  const logoUrl = "https://admin.eddesk.in/logo-full.png";
  const subject = `Callback Request - ${data.name} - EdDesk`;
  const sender = "EdDesk Alerts <callback@eddesk.in>";
  
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; margin-top: 40px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" bgcolor="#0891b2" style="padding: 40px;">
              <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 100px; padding: 12px 24px;">
                <tr>
                  <td align="center">
                    <img src="${logoUrl}" alt="EdDesk" width="120" style="display: block;" />
                  </td>
                </tr>
              </table>
              <h1 style="color: #ffffff; font-size: 24px; margin: 20px 0 0 0;">Callback Requested</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Parent Name</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.name}</td></tr>
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Mobile Number</td><td align="right" style="font-weight: 700; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.mobileno}</td></tr>
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">Preferred Time</td><td align="right" style="color: #0891b2; font-weight: 800; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${data.preferreddate}</td></tr>
                <tr><td style="color: #64748b; font-size: 14px; padding: 12px 0;">Requested On</td><td align="right" style="font-weight: 700; padding: 12px 0;">${data.date}</td></tr>
              </table>
              <div style="margin-top: 40px; text-align: center;">
                <a href="${adminUrl}" style="background-color: #0f172a; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700;">Review in Admin Panel</a>
              </div>
            </td>
          </tr>
          <tr><td bgcolor="#f8fafc" style="padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">&copy; ${new Date().getFullYear()} EdDesk Platform</td></tr>
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
      console.error("[email.util] callback email resend error:", result);
      return { success: false, error: result.message };
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("[email.util] callback email internal error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a notification email to support@eddesk.in for marketing leads.
 */
export async function sendMarketingLeadEmail(data: MarketingLeadEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = "support@eddesk.in"; // Hardcoded marketing lead recipient
  
  if (!apiKey) {
    console.error("[email.util] error: RESEND_API_KEY is not configured for marketing lead");
    return { success: false, error: "Configuration missing" };
  }

  const logoUrl = "https://admin.eddesk.in/logo-full.png";
  const subject = `New Lead: ${data.name} via ${data.source}`;
  const sender = "EdDesk Marketing <marketing@eddesk.in>";
  
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 20px; margin-top: 40px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" bgcolor="#0f172a" style="padding: 40px;">
              <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 100px; padding: 12px 24px;">
                <tr>
                  <td align="center">
                    <img src="${logoUrl}" alt="EdDesk" width="110" style="display: block;" />
                  </td>
                </tr>
              </table>
              <h1 style="color: #ffffff; font-size: 20px; margin: 20px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Marketing Lead Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="margin-bottom: 30px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                <span style="background-color: #4f46e5; color: #ffffff; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase;">Source: ${data.source}</span>
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr><td style="color: #64748b; font-size: 13px; padding: 12px 0;">Lead Name</td><td align="right" style="font-weight: 700; color: #1e293b; padding: 12px 0;">${data.name}</td></tr>
                <tr><td style="color: #64748b; font-size: 13px; padding: 12px 0;">Email</td><td align="right" style="font-weight: 700; color: #1e293b; padding: 12px 0;">${data.email}</td></tr>
                <tr><td style="color: #64748b; font-size: 13px; padding: 12px 0;">Mobile</td><td align="right" style="font-weight: 700; color: #1e293b; padding: 12px 0;">${data.mobileno}</td></tr>
                ${data.schoolname ? `<tr><td style="color: #64748b; font-size: 13px; padding: 12px 0;">School</td><td align="right" style="font-weight: 700; color: #1e293b; padding: 12px 0;">${data.schoolname}</td></tr>` : ''}
                <tr><td style="color: #64748b; font-size: 13px; padding: 12px 0;">Date</td><td align="right" style="font-weight: 700; color: #1e293b; padding: 12px 0;">${data.date}</td></tr>
                <tr><td colspan="2" style="color: #64748b; font-size: 13px; padding: 25px 0 10px 0; font-weight: 800; text-transform: uppercase;">Message</td></tr>
                <tr><td colspan="2" style="background-color: #f1f5f9; padding: 25px; border-radius: 15px; color: #334155; line-height: 1.6; font-size: 15px;">${data.message || 'No additional message provided.'}</td></tr>
              </table>
            </td>
          </tr>
          <tr><td bgcolor="#f8fafc" style="padding: 30px; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">&copy; ${new Date().getFullYear()} EdDesk &bull; Internal Notification</td></tr>
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
      console.error("[email.util] marketing lead email resend error:", result);
      return { success: false, error: result.message };
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("[email.util] marketing lead email internal error:", error);
    return { success: false, error: error.message };
  }
}
