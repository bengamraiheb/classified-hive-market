
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">HIVEMARKET</h3>
            <p className="text-sm text-muted-foreground">
              The modern marketplace for buying and selling locally.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
            <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link>
            <Link to="/press" className="text-sm text-muted-foreground hover:text-foreground">Press</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </nav>

          <nav className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Support</h3>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link>
            <Link to="/safety" className="text-sm text-muted-foreground hover:text-foreground">Safety Center</Link>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground">Community Guidelines</Link>
          </nav>

          <nav className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Legal</h3>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link>
          </nav>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} HiveMarket. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Facebook</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
