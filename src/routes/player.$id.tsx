import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/player/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello /player/{id}!</div>;
}
