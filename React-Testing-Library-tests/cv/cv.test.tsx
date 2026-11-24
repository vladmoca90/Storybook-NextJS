import { fireEvent, render, screen, within } from "@testing-library/react";
import CVPage from "@/app/cv/page";

// Exercise the assembled CV with real section components and resume data.
// jsdom cannot verify responsive CSS, printed pagination, or native dialogs.
describe("CV", () => {
  beforeEach(() => {
    render(<CVPage />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("presents the name and sections in the requested reading order", () => {
    const main = screen.getByRole("main");
    expect(
      within(main)
        .getAllByRole("heading")
        .map((heading) => heading.textContent),
    ).toEqual([
      "Vlad Mocanu",
      "Contact details",
      "Education",
      "Skills & tools",
      "Work experience",
    ]);
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", `#${main.id}`);
  });

  it("provides working email and telephone destinations and the current right to work text", () => {
    const contact = within(
      screen.getByRole("region", { name: "Contact details" }),
    );
    expect(
      contact.getByRole("link", { name: "vladmoca90@gmail.com" }),
    ).toHaveAttribute("href", "mailto:vladmoca90@gmail.com");
    expect(contact.getByRole("link", { name: "07455 404221" })).toHaveAttribute(
      "href",
      "tel:+447455404221",
    );
    expect(
      contact.getByText("Right to work: British citizen"),
    ).toBeInTheDocument();
    expect(contact.queryByText(/Living continuously/)).not.toBeInTheDocument();
  });

  it.each([
    [
      "LinkedIn",
      "linkedin.com/in/vlad-mocanu-0a280a3a/",
      "https://www.linkedin.com/in/vlad-mocanu-0a280a3a/",
    ],
    ["GitHub", "github.com/vladmoca90", "https://github.com/vladmoca90"],
  ])("links only the URL for %s", (label, url, destination) => {
    const contact = within(
      screen.getByRole("region", { name: "Contact details" }),
    );
    const link = contact.getByRole("link", { name: url });
    expect(link).toHaveAttribute("href", destination);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    expect(contact.getByText(`${label}:`)).toBeInTheDocument();
    expect(link).not.toHaveTextContent(`${label}:`);
  });

  it("shows both qualifications with their dates and result", () => {
    const education = within(screen.getByRole("region", { name: "Education" }));
    const qualifications = education.getAllByRole("article");
    expect(qualifications).toHaveLength(2);
    expect(qualifications[0]).toHaveTextContent("Avantaj Consulting");
    expect(qualifications[0]).toHaveTextContent("2015");
    expect(qualifications[0]).toHaveTextContent("IT Development School");
    expect(qualifications[0]).toHaveTextContent("Average mark: 92.5%");
    expect(qualifications[1]).toHaveTextContent("The University of Birmingham");
    expect(qualifications[1]).toHaveTextContent("2010 — 2013");
    expect(qualifications[1]).toHaveTextContent("BSc Environmental Science");
  });

  it("includes the latest eight skill categories", () => {
    const skills = within(
      screen.getByRole("region", { name: "Skills & tools" }),
    );
    for (const label of [
      "Frontend",
      "Styling & Design",
      "Testing tools",
      "Performance & Accessibility",
      "Data visualisation",
      "Content Management Systems",
      "Version Control & Collaboration",
      "AI-assisted tools",
    ]) {
      expect(skills.getByText(label)).toBeInTheDocument();
    }
    expect(
      skills.getByText(
        "WordPress, Elementor, custom themes, custom CMS platforms",
      ),
    ).toBeInTheDocument();
    expect(
      skills.getByText("GitHub Copilot, Codex, ChatGPT, Claude"),
    ).toBeInTheDocument();
  });

  it("shows all six roles in order with the latest experience bullets", () => {
    const experience = within(
      screen.getByRole("region", { name: "Work experience" }),
    );
    const jobs = experience.getAllByRole("article");
    const expected = [
      ["rEvolution World", "September 2024 - February 2026", 6],
      ["Prophet Ltd", "April 2024 - May 2024", 3],
      ["Motors.co.uk", "May 2018 - March 2024", 7],
      ["Ezekia Group", "January 2018 - March 2018", 2],
      ["Waitrose & Partners", "March 2017 - October 2017", 2],
      ["Bio-Techne", "December 2016 - January 2017", 1],
    ] as const;
    expect(jobs).toHaveLength(expected.length);
    expected.forEach(([company, dates, bullets], index) => {
      expect(within(jobs[index]).getByText(company)).toBeInTheDocument();
      expect(within(jobs[index]).getByText(dates)).toBeInTheDocument();
      expect(within(jobs[index]).getAllByRole("listitem")).toHaveLength(
        bullets,
      );
    });
    expect(jobs[0]).toHaveTextContent("clear error messages and retry options");
    expect(jobs[2]).toHaveTextContent("provided on-call support");
    expect(jobs[5]).toHaveTextContent("mobile and tablet product catalogue");
  });

  it("does not restore the removed sidebar, tagline, or introduction links", () => {
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Thoughtful interfaces. Reliable code."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Email me" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "View experience" }),
    ).not.toBeInTheDocument();
  });

  it("requests browser printing only after Print CV is clicked", () => {
    const print = jest.spyOn(window, "print").mockImplementation(() => {});
    expect(print).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Print CV" }));
    expect(print).toHaveBeenCalledTimes(1);
  });
});
