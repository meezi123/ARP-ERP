const STATUS_MAP = {
  'Draft':               'info',
  'Submitted':           'success',
  'Cancelled':           'error',
  'Pending':             'warning',
  'Partially Ordered':   'warning',
  'Ordered':             'success',
  'Issued':              'success',
  'Transferred':         'success',
  'Stopped':             'error',
  'To Bill':             'warning',
  'Completed':           'success',
  'Return':              'info',
  'Booked':              'info',
  'Shipped':             'brand',
  'Delivered':           'success',
  'Accepted':            'success',
  'Rejected':            'error',
  'Confirmed':           'success',
  'Partially Delivered': 'warning',
  'Active':              'success',
  'Inactive':            'warning',
  'Expired':             'error',
};

const PULSE_STATUSES = ['Submitted', 'Shipped', 'Active', 'Booked'];

export default function StatusBadge({ status }) {
  const variant = STATUS_MAP[status] || 'info';
  const pulse = PULSE_STATUSES.includes(status);

  return (
    <span className={`badge badge-${variant}`}>
      {pulse && <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}
