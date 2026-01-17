import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LeadsTable = () => {
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.leads);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Loading leads...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-100 text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Stage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((lead, index) => (
            <tr
              key={lead._id}
              className={`cursor-pointer hover:bg-slate-100 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
              onClick={() => navigate(`/leads/${lead._id}`)}
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {lead.name}
              </td>
              <td className="px-4 py-3 text-slate-700">{lead.email}</td>
              <td className="px-4 py-3 text-slate-700">{lead.phone || "-"}</td>
              <td className="px-4 py-3 text-slate-700">{lead.source}</td>
              <td className="px-4 py-3 text-slate-700">{lead.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
