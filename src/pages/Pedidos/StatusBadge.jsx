export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status}`}>
      {status === "solicitado" && "Solicitado"}
      {status === "andamento" && "Em andamento"}
      {status === "finalizado" && "Concluído"}
    </span>
  );
}
