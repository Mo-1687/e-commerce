export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 px-4">
      <div className="w-full max-w-md space-y-6">{children}</div>
    </div>
  );
}
