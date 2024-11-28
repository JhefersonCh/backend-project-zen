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

  public formatProjectsByTime(
    data: { monthyear: string; count: string }[],
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
          name: 'Proyectos',
          data: counts,
        },
      ],
      xaxis: {
        categories,
      },
      colors: this.generateRandomColors(data.length),
      title: {
        text: 'Proyectos por Mes',
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
