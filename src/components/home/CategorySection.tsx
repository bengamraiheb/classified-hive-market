
import { Link } from "react-router-dom";
import { Car, Home, Laptop, Shirt, Sofa, Briefcase, GraduationCap, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  color: string;
  href: string;
}

const categories: CategoryProps[] = [
  {
    icon: <Car className="h-6 w-6" />,
    name: "Vehicles",
    color: "bg-blue-100 text-blue-600",
    href: "/category/vehicles"
  },
  {
    icon: <Home className="h-6 w-6" />,
    name: "Real Estate",
    color: "bg-green-100 text-green-600",
    href: "/category/real-estate"
  },
  {
    icon: <Laptop className="h-6 w-6" />,
    name: "Electronics",
    color: "bg-purple-100 text-purple-600",
    href: "/category/electronics"
  },
  {
    icon: <Shirt className="h-6 w-6" />,
    name: "Fashion",
    color: "bg-pink-100 text-pink-600",
    href: "/category/fashion"
  },
  {
    icon: <Sofa className="h-6 w-6" />,
    name: "Furniture",
    color: "bg-amber-100 text-amber-600",
    href: "/category/furniture"
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    name: "Jobs",
    color: "bg-sky-100 text-sky-600",
    href: "/category/jobs"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    name: "Services",
    color: "bg-indigo-100 text-indigo-600",
    href: "/category/services"
  },
  {
    icon: <Baby className="h-6 w-6" />,
    name: "Baby & Kids",
    color: "bg-rose-100 text-rose-600",
    href: "/category/baby-kids"
  }
];

function CategoryCard({ icon, name, color, href }: CategoryProps) {
  return (
    <Link to={href} className="group">
      <div className="flex flex-col items-center justify-center gap-2 p-4 transition-all rounded-lg hover:bg-muted">
        <div className={cn("p-3 rounded-lg", color)}>
          {icon}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </Link>
  );
}

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
