import { Tasks } from '../entities/tasks.entity';
import { Users } from './../entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailTemplateService {
  recoveryPasswordTemplate(
    resetLink: string,
    userName: string,
    resetToken: string,
  ) {
    const template = `
          
            <div style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
              <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <!-- Encabezado -->
                <tr>
                  <td style="background-color: #6b46c1; padding: 40px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Recuperación de Contraseña</h1>
                  </td>
                </tr>
                
                <!-- Contenido -->
                <tr>
                  <td style="padding: 40px 20px;">
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                      ¡Hola ${userName || ''}! Hemos recibido una solicitud para restablecer tu contraseña.
                    </p>
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                      Si no realizaste esta solicitud, puedes ignorar este correo. De lo contrario, haz clic en el botón de abajo para continuar con el proceso.
                    </p>
                    
                    <!-- Botón -->
                    <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
                      <a href="${resetLink}?token=${resetToken}" 
                         style="background-color: #805ad5; 
                                color: white; 
                                padding: 12px 30px; 
                                text-decoration: none; 
                                border-radius: 5px;
                                font-weight: bold;
                                display: inline-block;
                                transition: background-color 0.3s ease;">
                        Recuperar Contraseña
                      </a>
                    </div>
                    
                  </td>
                </tr>
                
                <!-- Pie -->
                <tr>
                  <td style="background-color: #553c9a; padding: 20px; text-align: center;">
                    <p style="color: white; margin: 0; font-size: 14px;">
                      © ${new Date().getFullYear()} ProjectZen. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </div>

        `;
    return template;
  }

  assignTaskTemplate(user: Users, task: Tasks) {
    const template = `
    <div style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <table role="presentation" width="100%" style="max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Encabezado -->
        <tr>
          <td style="background-color: #6b46c1; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nueva Tarea Asignada</h1>
          </td>
        </tr>
        
        <!-- Contenido -->
        <tr>
          <td style="padding: 40px 20px;">
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              ¡Hola ${user.fullName || ''}!
            </p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Te han asignado una nueva tarea en ProjectZen. A continuación encontrarás los detalles:
            </p>

            <!-- Tarjeta de la tarea -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #6b46c1;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">
                ${task.title}
              </h2>
              
              <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                ${task.description.length > 100 ? task.description.substring(0, 100) + '...' : task.description}
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Fecha límite:</td>
                  <td style="color: #2d3748; font-size: 14px;">
                    ${new Date(task.deadline).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Proyecto:</td>
                  <td style="color: #2d3748; font-size: 14px;">${task.project.title}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Prioridad:</td>
                  <td style="color: #2d3748; font-size: 14px;">${task.priority.title}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Estado:</td>
                  <td style="color: #2d3748; font-size: 14px;">${task.status.title}</td>
                </tr>
              </table>
            </div>

            <!-- Botón de acción -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}general/projects/${task.projectId}?taskId=${task.id}" style="background-color: #6b46c1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Ir a la tarea</a>
            </div>

            <p style="color: #4a5568; font-size: 14px; line-height: 1.6;">
              Si no has solicitado acceso a ProjectZen o crees que este correo es un error, puedes ignorarlo.
            </p>
          </td>
        </tr>
        
        <!-- Pie -->
        <tr>
          <td style="background-color: #553c9a; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0 0 10px 0; font-size: 14px;">
              © ${new Date().getFullYear()} ProjectZen. Todos los derechos reservados.
            </p>
            <p style="color: #e2e8f0; margin: 0; font-size: 12px;">
              Este es un correo automático, por favor no respondas a este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </div>
    `;

    return template;
  }

  withTasksPendingTemplate(payload: any) {
    const template = `
    <div style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <table role="presentation" width="100%" style="max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Encabezado con indicador de urgencia -->
        <tr>
          <td style="background-color: #EF4444; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">¡Tarea Próxima a Vencer!</h1>
          </td>
        </tr>
        
        <!-- Contenido -->
        <tr>
          <td style="padding: 40px 20px;">
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              ¡Hola ${payload.fullname}!
            </p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Te recordamos que tienes una tarea pendiente que está próxima a vencer.
            </p>

            <!-- Tarjeta de la tarea -->
            <div style="background-color: #FEF2F2; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #EF4444;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">
                ${payload.title}
              </h2>
              
              <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Fecha límite:</td>
                  <td style="color: #DC2626; font-weight: bold; font-size: 14px;">
                    ${new Date(payload.deadline).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Estado:</td>
                  <td style="color: #DC2626; font-weight: bold; font-size: 14px;">${payload.status}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Proyecto:</td>
                  <td style="color: #2d3748; font-size: 14px;">${payload.projecttitle}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-size: 14px; padding-right: 10px;">Prioridad:</td>
                  <td style="color: #2d3748; font-size: 14px;">${payload.priority}</td>
                </tr>
              </table>
            </div>

            <!-- Timer visual -->
            <div style="background-color: #FEE2E2; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
              <p style="color: #DC2626; margin: 0; font-weight: bold;">
                ⏰ Tiempo restante: menos de 24 horas
              </p>
            </div>

            <!-- Botones de acción -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}general/projects/${payload.projectid}?taskId=${payload.id}" style="background-color: #DC2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 10px;">
                Ir a la tarea
              </a>
            </div>

            <p style="color: #4a5568; font-size: 14px; line-height: 1.6;">
              Este es un recordatorio automático. Por favor, toma acción lo antes posible para cumplir con la fecha límite.
            </p>
          </td>
        </tr>
        
        <!-- Pie -->
        <tr>
          <td style="background-color: #991B1B; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0 0 10px 0; font-size: 14px;">
              © ${new Date().getFullYear()} ProjectZen. Todos los derechos reservados.
            </p>
            <p style="color: #FEE2E2; margin: 0; font-size: 12px;">
              Este es un correo automático, por favor no respondas a este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </div>
    `;
    return template;
  }
}
