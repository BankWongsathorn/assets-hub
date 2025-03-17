import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface TableViewProps {
  data: any[];
  headers: string[];
  rows: any[];
}

export default function TableView({ data, headers, rows }: TableViewProps) {
  const handleDownloadCSV = () => {
    if (!data) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row: any[]) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "history.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const shouldTruncate = data.length > 10;
  const firstFour = shouldTruncate ? data.slice(0, 4) : data;
  const lastFour = shouldTruncate ? data.slice(-4) : [];

  data.map((item) => {
    headers.map((header) => {
      console.log(item[header]);
    });
  });

  return (
    <section>
      <hr />
      <div className="w-full my-4">
        <Button onClick={handleDownloadCSV}>
          <Download />
        </Button>
      </div>
      <Table id="print-table">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {firstFour.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header, index) => (
                <TableCell key={index}>{item[header]}</TableCell>
              ))}
            </TableRow>
          ))}

          {shouldTruncate && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                ...
              </TableCell>
            </TableRow>
          )}

          {shouldTruncate &&
            lastFour.map((item, index) => (
              <TableRow key={index}>
                {headers.map((header, index) => (
                  <TableCell key={index}>{item[header]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}
