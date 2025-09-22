import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardClient from "@/components/CardClient";

describe("CardClient Component", () => {
  it("renders subcomponents correctly", () => {
    render(
      <CardClient>
        <CardClient.Header>Header</CardClient.Header>
        <CardClient.Content>Content</CardClient.Content>
        <CardClient.Footer>Footer</CardClient.Footer>
        <CardClient.Icon icon={"icon"} />
      </CardClient>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText(/icon/i)).toBeInTheDocument();
  });
});
