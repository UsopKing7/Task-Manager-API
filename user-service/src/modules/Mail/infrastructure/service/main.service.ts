import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { env } from 'shared/consts/env'

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env.EMAIL,
      pass: env.PASSWORD
    }
  })

  async sendOTP(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"TASK-MANAGER-API" <${env.EMAIL}>`,
      to: email,
      subject: 'Código de verificación - OTP',
      html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="520" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
              
              <!-- Header -->
              <tr>
                <td style="padding: 32px 40px; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #333333; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Verificación de identidad</span>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 24px; font-weight: 400;">
                    Se ha solicitado un código de verificación para su cuenta.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                    Para continuar con el proceso de autenticación, introduzca el siguiente código:
                  </p>
                  
                  <!-- OTP Code -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 32px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border: 1px solid #d0d0d0;">
                          <tr>
                            <td style="padding: 20px 40px;">
                              <span style="color: #666666; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 8px;">Código de verificación</span>
                              <span style="font-size: 44px; font-weight: 300; letter-spacing: 12px; color: #222222; font-family: 'SF Mono', 'Courier New', monospace;">${code}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Expiration -->
                  <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 32px;">
                    Este código es válido por <span style="color: #333333; font-weight: 500;">10 minutos</span> a partir de la recepción de este mensaje.
                  </p>
                  
                  <!-- Security Notice -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 0; background-color: #fafafa; border-left: 3px solid #999999;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <p style="color: #555555; font-size: 13px; line-height: 1.5; margin: 0;">
                          <strong style="color: #333333;">Aviso de seguridad</strong><br>
                          Si no ha solicitado este código, ignore este mensaje. Su cuenta permanece segura.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px 32px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #999999; font-size: 12px; line-height: 1.5; margin: 0 0 8px;">
                    Este es un mensaje automático. Por favor, no responda a esta dirección de correo.
                  </p>
                  <p style="color: #aaaaaa; font-size: 11px; margin: 0;">
                    &copy; ${new Date().getFullYear()} TASK-MANAGER-API. Todos los derechos reservados.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
    })
  }
}
