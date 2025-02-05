import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white">
            How accurate is the vulnerability detection?
          </AccordionTrigger>
          <AccordionContent className="text-white/80">
            Our AI agent has been trained on thousands of audited smart
            contracts and known vulnerabilities. While highly accurate, we
            recommend using this tool as part of a comprehensive security
            approach that includes manual review and formal verification.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-white">
            What smart contracts do you support?
          </AccordionTrigger>
          <AccordionContent className="text-white/80">
            We support different smart contracts.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-white">
            How do send rewards work?
          </AccordionTrigger>
          <AccordionContent className="text-white/80">
            If you appreciate our audit work, you can optionally send some
            rewards to us.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-white">
            Is there an IDE extension available?
          </AccordionTrigger>
          <AccordionContent className="text-white/80">
            Not yet.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-white">
            How do I report a bug?
          </AccordionTrigger>
          <AccordionContent className="text-white/80">
            If you encounter any bugs or issues, please report them on our
            GitHub repository's issue tracker.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
