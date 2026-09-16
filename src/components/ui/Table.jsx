export default function Table({ columns, rows, rowKey = 'id', emptyMessage = 'No records found.' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-text-secondary border border-dashed border-border rounded-md">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left font-medium text-text-secondary uppercase text-xs tracking-wide px-4 py-3"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-border last:border-0 hover:bg-surface-raised/60">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-text-primary align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
