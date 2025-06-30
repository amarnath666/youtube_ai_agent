import {
  Copy,
  Download,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { formatMessage, formats } from "@/lib/helper";
import { toast } from "sonner";

const CopyDownloadDropdown = ({ content }: { content: string }) => {
  const [copiedFormat, setCopiedFormat] = useState(null);
  const formatContent = (format: string) => {
    const cleanContent = formatMessage(content);

    switch (format) {
      case "TXT":
        return cleanContent;

      case "JSON":
        const lines = cleanContent.split("\n").filter((line) => line.trim());
        return JSON.stringify(
          {
            summary: lines[0] || "Summary",
            content: cleanContent,
            points: lines.slice(1),
            timestamp: new Date().toISOString(),
          },
          null,
          2
        );

      case "CSV":
        const csvLines = cleanContent.split("\n").filter((line) => line.trim());
        let csv = "Point,Content\n";
        csvLines.forEach((line, index) => {
          csv += `"${index + 1}","${line.replace(/"/g, '""')}"\n`;
        });
        return csv;

      default:
        return cleanContent;
    }
  };

  const copyToClipboard = async (format: string) => {
    try {
      const formattedContent = formatContent(format);
      await navigator.clipboard.writeText(formattedContent);
      setCopiedFormat(format as any);
      setTimeout(() => setCopiedFormat(null), 2000);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadFile = (format: string) => {
    try {
      const formattedContent = formatContent(format);
      const blob = new Blob([formattedContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `summary.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("File downloaded!");
    } catch (err) {
      console.error("Failed to download:", err);
      toast.error("Failed to download file");
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs">
          Export Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {formats.map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <DropdownMenuItem className="flex items-center justify-between p-0 ">
              <div className="flex items-center gap-2 flex-1 px-2 py-1.5">
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{label}</span>
              </div>
              <div className="flex gap-1 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(key);
                  }}
                  className="h-6 w-6 p-0 hover:bg-gray-100 cursor-pointer"
                  title={`Copy as ${key}`}
                >
                  {copiedFormat === key ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3 " />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadFile(key);
                  }}
                  className="h-6 w-6 p-0 hover:bg-gray-100 cursor-pointer"
                  title={`Download as ${key}`}
                >
                  <Download className="w-3 h-3 " />
                </Button>
              </div>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CopyDownloadDropdown;
