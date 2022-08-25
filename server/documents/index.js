module.exports = ({ name, employeeid }) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <center>
          <h1>Appointment Letter</h1>
          </center>
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                         
                            <td>
                               Date: ${`${today.getDate()}. ${
                                 today.getMonth() + 1
                               }. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Name: ${name}
                            </td>
                            <td>
                               Employee ID: ${employeeid}
                            </td>
                         </tr>
                         
                      </table>
                   </td>
                </tr>
             </table>
             <br />

             <p>We are pleased to appoint you in <b>Cogent E services</b> .At our organization as per the employment terms and conditions stated below. Please note that the employment terms contained in this letter are subject to Company policy.</p>

             <p>Your effective date of appointment is  Date: ${`${today.getDate()}. ${
               today.getMonth() + 1
             }. ${today.getFullYear()}.`}. The term of your employment with the Company shall commence on the effective date and shall continue unless this Appointment Letter is terminated by either party in accordance with the terms of separation mentioned in this letter. </p>

             <p><b>Your employment with us will be governed by certain terms & conditions of employment which are mentioned below-</b></p>
            <style>
             dt,dd{
                            font-size: 14px;
                            text-align:justify;
                        }
                        p{
                            font-size: 14px;
                            text-align:justify;
                        }
                        </style>
                        <dt>
                            
                            <dt><b>2. Service Conditions-</b> You shall be governed by the rules and regulations and such other practices, systems, procedures, and policies in existence or established by the Company from time to time. 
                            </dt>
                            <br>

                            <dt><b>3. E-Induction-</b> You will be a part of the e-induction procedure to make you familiarize with the Company policies and day-to-day working. 
                            </dt>
                            <br>

                            <dt><b>4. Assignment / Transfer-</b>Your usual place of work will be in Noida. However, during your service with the Company you shall be liable to be posted/ transferred to specific projects, assignments, jobs, etc. in which case you will be required to perform your services at such location, division, department, or branch of the Company as the Company may deem fit.
                            </dt>
                            <br>

                            <dt><b>5. Duties & Obligation-</b></dt>      
                            <dd>5.1 You must effectively, diligently and to the best of your ability perform all responsibilities and obligations.
                            </dd>

                            <dd>5.2 You will be in whole time service /employment of the Company and shall not engage directly or indirectly in any other work either part-time or fully.
                            </dd>

                            <dd>5.3 You shall act loyally and faithfully to the Company and obey the orders or instructions of the management of the Company.
                            </dd>

                            <dd>5.4 You shall always maintain high standards of secrecy of confidential records, documents and information relating to the business which may be known to you and shall use them always in the best interest of the company. You shall upon end of your services to the company for any </dd>
                            <br>
                            <br><br><br>
                            <p>Yours truly,<br><b>Cogent E services</b></p></br>
          </div>
       </body>
    </html>
    `;
};
