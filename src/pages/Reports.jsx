import React, { useState } from 'react';
import { useBusinessContext } from '../context/BusinessContext';
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Download,
  Filter,
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Reports = () => {
  const { products, salesTransactions, customers, purchaseRecords } = useBusinessContext();

  const [reportType, setReportType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Calculate daily sales
  const getDailySales = (date) => {
    const sales = salesTransactions.filter((s) => s.date === date);
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalOrders = sales.length;
    const totalItems = sales.reduce((sum, s) => sum + s.items.length, 0);
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return { sales, totalSales, totalOrders, totalItems, avgOrderValue };
  };

  // Calculate monthly sales
  const getMonthlySales = (month) => {
    const sales = salesTransactions.filter((s) => s.date.startsWith(month));
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalOrders = sales.length;
    const totalItems = sales.reduce((sum, s) => sum + s.items.length, 0);
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Daily breakdown
    const dailyBreakdown = {};
    sales.forEach((sale) => {
      const day = sale.date;
      if (!dailyBreakdown[day]) {
        dailyBreakdown[day] = { orders: 0, revenue: 0 };
      }
      dailyBreakdown[day].orders++;
      dailyBreakdown[day].revenue += sale.total;
    });

    return { sales, totalSales, totalOrders, totalItems, avgOrderValue, dailyBreakdown };
  };

  // Get top selling products
  const getTopProducts = (sales) => {
    const productSales = {};
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.total;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  };

  // Get payment method breakdown
  const getPaymentBreakdown = (sales) => {
    const breakdown = {};
    sales.forEach((sale) => {
      if (!breakdown[sale.paymentMethod]) {
        breakdown[sale.paymentMethod] = { count: 0, amount: 0 };
      }
      breakdown[sale.paymentMethod].count++;
      breakdown[sale.paymentMethod].amount += sale.total;
    });
    return breakdown;
  };

  // Export to CSV
  const exportToCSV = () => {
    const data = reportType === 'daily' ? getDailySales(selectedDate) : getMonthlySales(selectedMonth);
    let csv = '';

    if (reportType === 'daily') {
      csv = 'Sale ID,Time,Customer,Items,Subtotal,Discount,Tax,Total,Payment Method\n';
      data.sales.forEach((sale) => {
        csv += `${sale.id},${sale.time},${sale.customerName},${sale.items.length},${sale.subtotal},${sale.discount},${sale.tax},${sale.total},${sale.paymentMethod}\n`;
      });
    } else {
      csv = 'Date,Orders,Revenue\n';
      Object.entries(data.dailyBreakdown).forEach(([date, stats]) => {
        csv += `${date},${stats.orders},${stats.revenue}\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-report-${reportType === 'daily' ? selectedDate : selectedMonth}.csv`;
    a.click();
  };

  const currentData = reportType === 'daily' ? getDailySales(selectedDate) : getMonthlySales(selectedMonth);
  const topProducts = getTopProducts(currentData.sales);
  const paymentBreakdown = getPaymentBreakdown(currentData.sales);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales Reports</h1>
        <p className="text-gray-600">View detailed sales analytics and reports</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl p-6 shadow-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
            >
              <option value="daily">Daily Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>

          {/* Date/Month Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {reportType === 'daily' ? 'Select Date' : 'Select Month'}
            </label>
            {reportType === 'daily' ? (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
              />
            ) : (
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
              />
            )}
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={exportToCSV}
              className="w-full bg-hospital-primary text-white px-4 py-2 rounded-lg hover:bg-hospital-dark transition flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-30 p-3 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <p className="text-sm opacity-90">Revenue</p>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(currentData.totalSales)}</p>
          <p className="text-sm opacity-75 mt-2">
            {reportType === 'daily' ? 'Today' : 'This Month'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-30 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <p className="text-sm opacity-90">Orders</p>
          </div>
          <p className="text-3xl font-bold">{currentData.totalOrders}</p>
          <p className="text-sm opacity-75 mt-2">Total transactions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-6 text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-30 p-3 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <p className="text-sm opacity-90">Items</p>
          </div>
          <p className="text-3xl font-bold">{currentData.totalItems}</p>
          <p className="text-sm opacity-75 mt-2">Products sold</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-30 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-sm opacity-90">Avg Order</p>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(currentData.avgOrderValue)}</p>
          <p className="text-sm opacity-75 mt-2">Per transaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-hospital-primary" />
            <span>Top Selling Products</span>
          </h2>
          <div className="space-y-3">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-hospital-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.quantity} units sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-hospital-primary">{formatCurrency(product.revenue)}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No sales data available</p>
            )}
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-hospital-primary" />
            <span>Payment Methods</span>
          </h2>
          <div className="space-y-3">
            {Object.entries(paymentBreakdown).length > 0 ? (
              Object.entries(paymentBreakdown).map(([method, data]) => (
                <div key={method} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{method}</p>
                    <p className="font-bold text-hospital-primary">{formatCurrency(data.amount)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{data.count} transactions</span>
                    <span>Avg: {formatCurrency(data.amount / data.count)}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-hospital-primary rounded-full h-2"
                      style={{
                        width: `${(data.amount / currentData.totalSales) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No payment data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Daily Breakdown (only for monthly reports) */}
      {reportType === 'monthly' && (
        <div className="bg-white rounded-xl p-6 shadow-card mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-hospital-primary" />
            <span>Daily Breakdown</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Orders
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Avg Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(currentData.dailyBreakdown)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .map(([date, stats]) => (
                    <tr key={date} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{date}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{stats.orders}</td>
                      <td className="px-4 py-3 text-sm font-bold text-hospital-primary">
                        {formatCurrency(stats.revenue)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatCurrency(stats.revenue / stats.orders)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Transaction List */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <FileText className="h-6 w-6 text-hospital-primary" />
          <span>
            Transactions {reportType === 'daily' ? `(${selectedDate})` : `(${selectedMonth})`}
          </span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Sale ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.sales.length > 0 ? (
                currentData.sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{sale.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {sale.date} {sale.time}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">{sale.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.items.length} items</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-hospital-primary">
                      {formatCurrency(sale.total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-600">
                    No transactions found for this period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
