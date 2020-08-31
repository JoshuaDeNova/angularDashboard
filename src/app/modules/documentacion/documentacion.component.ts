import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { User } from 'src/app/modelos/User';
import { Documentation } from '../../modelos/Documentation';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.css'],
  providers: [UsuarioService]
})
export class DocumentacionComponent implements OnInit {

  public usuario: User;
  public documentacion;
  public docTrabajadores;
  public docPoderContratar;
  public docA: Documentation;
  public docB: Documentation;
  public docC: Documentation;
  public docD: Documentation;
  public docE: Documentation;
  public docF: Documentation;
  public docG: Documentation;
  public docH: Documentation;
  public docI: Documentation;
  public docJ: Documentation;
  public docPresTa: Documentation;
  public info: string;

  constructor(
    private _userService: UsuarioService
  ) {
    this.usuario = this._userService.getIdentity();
    this.documentacion = [];
    this.docTrabajadores = [];
    this.docPoderContratar = [];
  }

  ngOnInit() {
    this.initialiceDoc();
  }

  initialiceDoc() {
    if (this.usuario.docType) {
      this.docA = new Documentation('Código CNAE', 'Dependiendo de la actividad que quiera realizar, deberá buscar el código CNAE con el que se corresponde.', 'https://www.cnae.com.es/lista-actividades.php');
      this.docB = new Documentation('Seguro de Responsabilidad Civil', 'Obligatorio realizar este tipo de seguro en cualquier compañía de seguros.', null);
      this.docC = new Documentation('Solicitud Certificado Digital', 'Debe solicitar el Certificado Digital como persona física en la Sede electrónica de la fábrica nacional de moneda y timbre. Debe elegir la opción solicitud sin certificado. Rellene los datos y le enviaran un correo con un código. Deberá ir a su oficina de la Seguridad Social y verificar su identidad con el DNI y en pocas horas le enviaran su certificado digital. Si lo desea, puede poner contraseña a su certificado digital.', 'https://www.sede.fnmt.gob.es/certificados/certificado-de-representante/administrador-unico-solidario/solicitar-certificado');
      this.docD = new Documentation('DUE o CIRCE', 'Documento para darse de alta como autónomo en hacienda y en la Seguridad Social de manera simultánea. Para rellenar este documento. Debe acceder al área PAE e iniciar sesión mediante clave y podrá acceder con su certificado digital. Es obligatorio seleccionar una mutua a la hora de rellenar.', 'http://www.paeelectronico.es/es-ES/CanalPAE/Paginas/AreaPAE.aspx');
      this.docE = new Documentation('Prevención de riesgos laborales', 'Debe contratar una empresa de prevención de riesgos laborales para formar al trabajador y así evitar posibles riesgos en el desarrollo de su actividad.', 'http://www.mitramiss.gob.es/es/Guia/texto/guia_10/contenidos/guia_10_22_1.htm');
      this.docF = new Documentation('Comunicación de apertura de centro de trabajo', 'Comunicación del centro de trabajo a la Consejería de trabajo de su Comunidad Autónoma. Esta comunicación se debe realizar dentro de los 30 días hábiles siguientes al inicio de la actividad.', 'https://www.gmconsulting.pro/categoria-laboral/la-comunicacion-de-apertura-de-centro-de-trabajo/');
      this.docG = new Documentation('Modelo TA.2', 'Documento para dar de alta a los trabajadores que quiera contratar. Recuerde que puede dar de alta a un trabajador hasta 3 días antes. Deberá descargar el PDF para imprimir y presentarlo en la oficina de Seguridad Social correspondiente.', 'http://www.seg-social.es/wps/portal/wss/internet/Trabajadores/Afiliacion/32765/32770');
      this.docH = new Documentation('Elección de contrato para el trabajador', 'Elección del tipo de contrato para tu trabajador y su jornada de trabajo.', 'https://www.sepe.es/HomeSepe/empresas/Contratos-de-trabajo/modelos-contrato.html');
      this.docI = new Documentation('SEPE presentar contrato', 'Deberá presentar el contrato en el Servicio de Empleo Público Español (SEPE). Con su certificado digital podrá presentar telemáticamente el contrato seleccionado.', 'https://www.sepe.es/HomeSepe/empresas/servicios-para-empresas/comunica-contratacion.html');
      this.docJ = new Documentation('Registro de jornada', 'Es obligatorio rellenar registro de jornada para su trabajador indicando hora de inicio y hora de finalización firmadas.', 'http://www.mitramiss.gob.es/es/Guia/texto/guia_10/contenidos/guia_10_22_1.htm');

      this.documentacion.push(this.docA);
      this.documentacion.push(this.docB);
      this.documentacion.push(this.docC);
      this.documentacion.push(this.docD);

      this.docPoderContratar.push(this.docE);
      this.docPoderContratar.push(this.docF);

      this.docTrabajadores.push(this.docG);
      this.docTrabajadores.push(this.docH);
      this.docTrabajadores.push(this.docI);
      this.docTrabajadores.push(this.docJ);
    } else {
      this.docA = new Documentation('Código CNAE', 'Dependiendo de la actividad que quiera realizar, deberá buscar el código CNAE con el que se corresponde.', 'https://www.cnae.com.es/lista-actividades.php');
      this.docB = new Documentation('Seguro de Responsabilidad Civil', 'Obligatorio realizar este tipo de seguro en cualquier compañía de seguros.', null);
      this.docC = new Documentation('modelo 036', 'Documento para darse de alta como autónomo en hacienda.  Deberá cumplimentar el documento y presentarlo en las oficinas de hacienda.', 'https://www.agenciatributaria.gob.es/AEAT.sede/tramitacion/G322.shtml');
      this.docD = new Documentation('modelo 037', 'Documento para darse de alta como autónomo en la Seguridad Social. Deberá cumplimentar el documento y presentarlo en su oficina de la Seguridad Social.', 'http://www.seg-social.es/wps/portal/wss/internet/Trabajadores/Afiliacion/10817/31190/572#571');
      this.docPresTa = new Documentation('Modelo TC1/15-3', 'Documento para realizar la domiciliación de pagos a la Seguridad Social. Deberá cumplimentar el documento y presentarlo en su oficina de la Seguridad Social.', 'http://www.segsocial.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/1327/1342 ');
      this.docE = new Documentation('Prevención de riesgos laborales', 'Debe contratar una empresa de prevención de riesgos laborales para formar al trabajador y así evitar posibles riesgos en el desarrollo de su actividad.', null);
      this.docF = new Documentation('Comunicación de apertura de centro de trabajo', 'Comunicación del centro de trabajo a la Consejería de trabajo de su Comunidad Autónoma. Esta comunicación se debe realizar dentro de los 30 días hábiles siguientes al inicio de la actividad.', 'https://www.gmconsulting.pro/categoria-laboral/la-comunicacion-de-apertura-de-centro-de-trabajo/');
      this.docG = new Documentation('Modelo TA.2', 'Documento para dar de alta a los trabajadores que quiera contratar. Recuerde que puede dar de alta a un trabajador hasta 3 días antes. Deberá descargar el PDF para imprimir y presentarlo en la oficina de Seguridad Social correspondiente.', 'http://www.seg-social.es/wps/portal/wss/internet/Trabajadores/Afiliacion/32765/32770');
      this.docH = new Documentation('Elección de contrato para el trabajador', 'Elección del tipo de contrato para tu trabajador y su jornada de trabajo.', 'https://www.sepe.es/HomeSepe/empresas/Contratos-de-trabajo/modelos-contrato.html');
      this.docI = new Documentation('SEPE presentar contrato', 'Deberá presentar el contrato en el Servicio de Empleo Público Español (SEPE). Recuerde que debe imprimir tres copias del contrato obligatoriamente, una para usted, otra para el trabajador y la última para el SEPE. Debe presentar el contrato en un plazo de 10 días.', 'https://www.sepe.es/HomeSepe/empresas/servicios-para-empresas/comunica-contratacion.html');
      this.docJ = new Documentation('Registro de jornada', 'Es obligatorio rellenar registro de jornada para su trabajador indicando hora de inicio y hora de finalización firmadas.', 'http://www.mitramiss.gob.es/es/Guia/texto/guia_10/contenidos/guia_10_22_1.htm');

      this.documentacion.push(this.docA);
      this.documentacion.push(this.docB);
      this.documentacion.push(this.docC);
      this.documentacion.push(this.docD);
      this.documentacion.push(this.docPresTa);

      this.docPoderContratar.push(this.docE);
      this.docPoderContratar.push(this.docF);

      this.docTrabajadores.push(this.docG);
      this.docTrabajadores.push(this.docH);
      this.docTrabajadores.push(this.docI);
      this.docTrabajadores.push(this.docJ);
    }
  }

}
