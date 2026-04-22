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

  async sendEmailConfirmation(email: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"TASK-MANAGER-API" <${env.EMAIL}>`,
      to: email,
      subject: 'Cuenta verificada - TASK-MANAGER-API',
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
                  <span style="color: #333333; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Confirmación de cuenta</span>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #222222; font-size: 22px; font-weight: 400; margin: 0 0 24px; line-height: 1.3;">
                    Su cuenta ha sido verificada
                  </h2>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Su dirección de correo electrónico <span style="color: #222222; font-weight: 500;">${email}</span> ha sido confirmada correctamente.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                    Ya puede acceder a todos los servicios de TASK-MANAGER-API utilizando sus credenciales.
                  </p>
                  
                  <!-- Status Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 32px; background-color: #fafafa; border: 1px solid #e0e0e0;">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="24" style="font-size: 18px; color: #2e7d32;">✓</td>
                            <td style="color: #333333; font-size: 14px; line-height: 1.5;">
                              <strong style="color: #222222;">Estado de la cuenta:</strong> Activa y verificada
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Next Steps -->
                  <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
                    <strong style="color: #333333;">Próximos pasos:</strong>
                  </p>
                  <ul style="margin: 0 0 32px; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
                    <li>Inicie sesión con sus credenciales</li>
                    <li>Configure su perfil de usuario</li>
                    <li>Comience a gestionar sus tareas y proyectos</li>
                  </ul>
                  
                  <!-- Support Notice -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 0; background-color: #fafafa; border-left: 3px solid #999999;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <p style="color: #555555; font-size: 13px; line-height: 1.5; margin: 0;">
                          <strong style="color: #333333;">Soporte técnico</strong><br>
                          Si encuentra algún problema o tiene preguntas, contacte con el equipo de soporte a través de los canales oficiales.
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

  async sendOtpChangePassword(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"TASK-MANAGER-API" <${env.EMAIL}>`,
      to: email,
      subject: 'Solicitud de cambio de contraseña - TASK-MANAGER-API',
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
                  <span style="color: #333333; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Cambio de contraseña</span>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #222222; font-size: 22px; font-weight: 400; margin: 0 0 24px; line-height: 1.3;">
                    Solicitud de cambio de contraseña
                  </h2>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Se ha recibido una solicitud para cambiar la contraseña asociada a su cuenta.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                    Para completar el proceso, introduzca el siguiente código de verificación:
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
                  
                  <!-- Warning Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 0; background-color: #fafafa; border-left: 3px solid #999999;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <p style="color: #555555; font-size: 13px; line-height: 1.5; margin: 0;">
                          <strong style="color: #333333;">Aviso de seguridad</strong><br>
                          Si no ha solicitado cambiar su contraseña, ignore este mensaje. Su contraseña actual permanece sin cambios y su cuenta está protegida.
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Additional Security Note -->
                  <p style="color: #777777; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">
                    Por seguridad, no comparta este código con nadie. El equipo de TASK-MANAGER-API nunca le solicitará este código por teléfono, correo electrónico o cualquier otro medio.
                  </p>
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

  async sendConfirmationChangePassword(email: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"TASK-MANAGER-API" <${env.EMAIL}>`,
      to: email,
      subject: 'Contraseña actualizada - TASK-MANAGER-API',
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
                  <span style="color: #333333; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Confirmación de cambio</span>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #222222; font-size: 22px; font-weight: 400; margin: 0 0 24px; line-height: 1.3;">
                    Su contraseña ha sido actualizada
                  </h2>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    La contraseña asociada a su cuenta <span style="color: #222222; font-weight: 500;">${email}</span> ha sido modificada correctamente.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                    Este cambio se realizó el <span style="color: #222222; font-weight: 500;">${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>.
                  </p>
                  
                  <!-- Confirmation Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 32px; background-color: #fafafa; border: 1px solid #e0e0e0;">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="24" style="font-size: 18px; color: #2e7d32;">✓</td>
                            <td style="color: #333333; font-size: 14px; line-height: 1.5;">
                              <strong style="color: #222222;">Estado:</strong> Contraseña actualizada correctamente
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Important Notice -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 0; background-color: #fafafa; border-left: 3px solid #999999;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <p style="color: #555555; font-size: 13px; line-height: 1.5; margin: 0;">
                          <strong style="color: #333333;">Información importante</strong><br>
                          Si no ha realizado este cambio, su cuenta podría estar comprometida. Contacte con soporte técnico inmediatamente para proteger su cuenta.
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Security Recommendations -->
                  <div style="margin-top: 32px;">
                    <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
                      <strong style="color: #333333;">Recomendaciones de seguridad:</strong>
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 13px; line-height: 1.8;">
                      <li>Utilice una contraseña única que no emplee en otros servicios</li>
                      <li>Combine letras mayúsculas, minúsculas, números y caracteres especiales</li>
                      <li>Considere activar la autenticación en dos pasos si está disponible</li>
                    </ul>
                  </div>
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
