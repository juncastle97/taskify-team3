import { InitialCardData } from "@/types/cards";

export default function mapCardList(initialData: InitialCardData) {
  return initialData.cards.map(
    ({ id, title, tags, dueDate, assignee, imageUrl }) => ({
      id,
      title,
      tags,
      dueDate,
      profileImageUrl: assignee.profileImageUrl,
      imageUrl,
    }),
  );
}
