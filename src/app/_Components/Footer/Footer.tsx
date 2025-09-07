import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive offers, and more.
          </p>
          <div className="flex items-center flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg  bg-accent-foreground border-0 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <Button
              size="lg"
              variant="secondary"
              className="hover:scale-105 cursor-pointer transition-transform"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
