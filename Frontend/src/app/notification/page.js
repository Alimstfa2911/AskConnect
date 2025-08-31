import { useSubscription } from "@apollo/client/react";
import { NOTIFICATION_SUBSCRIPTION } from "../graphql/subscription";



export default function NotificationBell({ userId }) {
  const { data, loading } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    variables: { userId }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      🔔 New: {data?.notificationAdded?.message}
    </div>
  );
}
