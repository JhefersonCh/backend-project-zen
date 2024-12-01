import { Injectable } from '@nestjs/common';

export interface BarChartOptions {
  series: { name: string; data: number[] }[];
  xaxis: { categories: string[] };
  colors?: string[];
  title?: {
    text: string;
    align?: string;
    margin?: number;
    style?: {
      fontSize?: string;
    };
  };
}

export interface PolarChartsOptions {
  series: number[];
  labels?: string[];
  title?: {
    text: string;
    align?: string;
    margin?: number;
    style?: {
      fontSize?: string;
    };
  };
}

@Injectable()
export class FormatReportsService {
  private readonly monthLabels: Record<number, string> = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };

  public formatReportsByTime(
    data: { monthyear: string; count: string }[],
    type: 'projects' | 'tasks',
  ): Partial<BarChartOptions> {
    const categories: string[] = [];
    const counts: number[] = [];

    data.forEach((item) => {
      const [year, month] = item.monthyear.split('-');
      const monthLabel = this.monthLabels[parseInt(month)];
      categories.push(`${monthLabel}-${year}`);
      counts.push(parseInt(item.count));
    });

    return {
      series: [
        {
          name: type === 'projects' ? 'Proyectos' : 'Tareas',
          data: counts,
        },
      ],
      xaxis: {
        categories,
      },
      colors: this.generateRandomColors(data.length),
      title: {
        text: `${type === 'projects' ? 'Proyectos' : 'Tareas'} por Mes`,
        align: 'center',
        margin: 50,
        style: {
          fontSize: '26px',
        },
      },
    };
  }

  public formatCompletedVsInProgress(data: {
    completed: number;
    inProgress: number;
  }): Partial<PolarChartsOptions> {
    return {
      series: [data.completed, data.inProgress],
      labels: ['Finalizados', 'En Progreso'],
      title: {
        text: 'Proyectos Finalizados y En Progreso',
        align: 'center',
        margin: 50,
        style: {
          fontSize: '26px',
        },
      },
    };
  }

  public formatReportsByStatus(data: {
    notstarted: string;
    inprogress: string;
    completed: string;
    reviewed: string;
  }): Partial<PolarChartsOptions> {
    return {
      series: [
        parseInt(data.notstarted),
        parseInt(data.inprogress),
        parseInt(data.completed),
        parseInt(data.reviewed),
      ],
      labels: ['No Iniciadas', 'En Progreso', 'Finalizadas', 'Revisadas'],
      title: {
        text: 'Tareas por Estado',
        align: 'center',
        margin: 50,
        style: {
          fontSize: '26px',
        },
      },
    };
  }

  public formatReportsByMembersByProject(
    data: {
      title: string;
      memberCount: string;
    }[],
  ): Partial<BarChartOptions> {
    return {
      series: [
        {
          name: 'Miembros',
          data: data.map((item) => parseInt(item.memberCount)),
        },
      ],
      xaxis: {
        categories: data.map((item) => item.title),
      },
      colors: this.generateRandomColors(data.length),
      title: {
        text: 'Miembros por Proyecto',
        align: 'center',
        margin: 50,
        style: {
          fontSize: '26px',
        },
      },
    };
  }

  public formatReportsByMembersProgress(
    data: {
      memberName: string;
      progress: string;
    }[],
  ) {
    return {
      series: data.map((item) => item.progress),
      labels: data.map((item) => item.memberName),
      title: {
        text: 'Progreso de Miembros por Proyecto',
        align: 'center',
        margin: 50,
        style: {
          fontSize: '26px',
        },
      },
    };
  }

  private generateRandomColors(count: number): string[] {
    return Array.from(
      { length: count },
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`,
    );
  }
}
