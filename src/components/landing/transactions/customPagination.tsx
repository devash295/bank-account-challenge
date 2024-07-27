import { Button } from "@mui/material";

type CustomPaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      <span style={{ marginRight: "16px" }}>
        Showing {page * rowsPerPage + 1} to{" "}
        {Math.min(count, (page + 1) * rowsPerPage)} of {count} entries
      </span>
      <div>
        <Button
          onClick={() => onPageChange(0)}
          disabled={page === 0}
          style={{ margin: "0 8px" }}
        >
          First
        </Button>
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          style={{ margin: "0 8px" }}
        >
          Prev
        </Button>

        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          style={{ margin: "0 8px" }}
        >
          Next
        </Button>
        <Button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          style={{ margin: "0 8px" }}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default CustomPagination;
