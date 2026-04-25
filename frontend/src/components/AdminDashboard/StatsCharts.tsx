import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import type { Automatizacion } from '../../types';

interface Props {
  automatizaciones: Automatizacion[];
}

const ESTADO_LABELS: Record<string, string> = {
  pendiente_revision: 'Revisión',
  pendiente_pago_anticipo: 'Anticipo',
  en_desarrollo: 'Desarrollo',
  pendiente_pago_final: 'Pago final',
  terminada: 'Terminada',
  rechazada: 'Rechazada',
  cancelada: 'Cancelada',
};

const ESTADO_COLORS: Record<string, string> = {
  pendiente_revision: '#f59e0b',
  pendiente_pago_anticipo: '#3b82f6',
  en_desarrollo: '#8b5cf6',
  pendiente_pago_final: '#06b6d4',
  terminada: '#22c55e',
  rechazada: '#ef4444',
  cancelada: '#6b7280',
};

const StatsCharts: React.FC<Props> = ({ automatizaciones }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const axisColor = isDark ? '#64748b' : '#9ca3af';
  const gridColor = isDark ? '#1e293b' : '#f3f4f6';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e5e7eb';
  const tooltipText = isDark ? '#f1f5f9' : '#111827';
  const cardBg = isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200';
  const titleColor = isDark ? 'text-slate-200' : 'text-gray-800';

  // --- Gráfico 1: automatizaciones por estado ---
  const dataEstados = Object.keys(ESTADO_LABELS).map(estado => ({
    estado: ESTADO_LABELS[estado],
    total: automatizaciones.filter(a => a.estado === estado).length,
    fill: ESTADO_COLORS[estado],
  })).filter(d => d.total > 0);

  // --- Gráfico 2: automatizaciones por mes (últimos 6 meses) ---
  const now = new Date();
  const meses: { label: string; year: number; month: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    meses.push({
      label: d.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }

  const dataMeses = meses.map(({ label, year, month }) => ({
    mes: label,
    solicitudes: automatizaciones.filter(a => {
      const f = new Date(a.fecha_solicitud);
      return f.getFullYear() === year && f.getMonth() === month;
    }).length,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">

      {/* Gráfico de barras — por estado */}
      <div className={`rounded-xl border p-5 ${cardBg}`}>
        <p className={`text-sm font-semibold mb-4 ${titleColor}`}>Automatizaciones por estado</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dataEstados} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="estado" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
              labelStyle={{ color: tooltipText, fontWeight: 600, fontSize: 12 }}
              itemStyle={{ color: tooltipText, fontSize: 12 }}
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
            />
            <Bar dataKey="total" name="Total" radius={[4, 4, 0, 0]}>
              {dataEstados.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de área — solicitudes por mes */}
      <div className={`rounded-xl border p-5 ${cardBg}`}>
        <p className={`text-sm font-semibold mb-4 ${titleColor}`}>Solicitudes últimos 6 meses</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={dataMeses} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="mes" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
              labelStyle={{ color: tooltipText, fontWeight: 600, fontSize: 12 }}
              itemStyle={{ color: tooltipText, fontSize: 12 }}
              cursor={{ stroke: isDark ? '#334155' : '#e5e7eb' }}
            />
            <Area
              type="monotone"
              dataKey="solicitudes"
              name="Solicitudes"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#gradCyan)"
              dot={{ fill: '#06b6d4', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default StatsCharts;
