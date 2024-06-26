import { TranscriptionData } from "@/types";
import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface AudioDataProps {
  audioData: TranscriptionData;
}
const AudioData: FC<AudioDataProps> = ({ audioData }) => {
  return (
    <div className="flex flex-col space-y-2 mt-5">
      <div>
        {" "}
        <span className="font-semibold"> Transcription - </span>{" "}
        {audioData.Transcription}
      </div>
      <div>
        {" "}
        <span className="font-semibold">Translation - </span>{" "}
        {audioData.Translation}
      </div>
      <div className="p-2 flex flex-col space-y-2">
        <span className="font-semibold">
          Advanced Transcription and Translation with Diarization
        </span>
        <div className="h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Text</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audioData[
                "Advanced Transcription and Translation with Diarization"
              ].map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.Time}</TableCell>
                  <TableCell>{item.Speaker}</TableCell>
                  <TableCell>{item.Text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-2 flex flex-col space-y-2">
        <span className="font-semibold">Typical Potent Features</span>
        <div className="h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Method</TableHead>
                <TableHead>Feature Name</TableHead>
                <TableHead>Feature Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audioData["Typical Potent Features"].map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.Method}</TableCell>
                  <TableCell>{item["Feature Name"]}</TableCell>
                  <TableCell>{item["Feature Value"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AudioData;
