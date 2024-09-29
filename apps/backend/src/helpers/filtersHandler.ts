import moment from 'moment';
import { ParsedQs } from 'qs'; // Import ParsedQs

interface FiltersHandlerResult {
  filters: Record<string, unknown>;
  sort: string;
  select: string;
}

export default function filtersHandler(query: ParsedQs): FiltersHandlerResult {
  const filters: Record<string, unknown> = {};

  let sort = '-_id';
  let select = '';

  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (value !== undefined && value !== '') {
      switch (key) {
        case 'fullName':
        case 'title':
        case 'email':
          filters[key] = { $regex: value as string, $options: 'i' };
          break;

        case 'createdAt':
          if (typeof value === 'string') {
            // Ensure value is a string
            filters.createdAt = {
              $gte: moment(value).startOf('day').toISOString(),
              $lt: moment(value).endOf('day').toISOString(),
            };
          }
          break;

        case 'sort':
          if (typeof value === 'string') {
             sort = value;
          }
          break;

        case 'select':
          if (typeof value === 'string') {
            select = value.replace(/,/g, ' ');
          }
          break;

        default:
          if (typeof value === 'string') {
            filters[key] = value.split(', ');
          } else if (Array.isArray(value)) {
            filters[key] = value;
          }
          break;
      }
    }
  });

  return { filters, sort, select };
}
