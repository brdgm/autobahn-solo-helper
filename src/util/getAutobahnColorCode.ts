import AutobahnColor from '@/services/enum/AutobahnColor';

/**
 * Get color code for autobahn color.
 * @param autobahnColor Autobahn color
 * @returns Color code
 */
export default function(autobahnColor: AutobahnColor) : string {
  switch (autobahnColor) {
    case AutobahnColor.RED:
      return '#b1433c'
    case AutobahnColor.CYAN:
      return '#189f87'
    case AutobahnColor.ORANGE:
      return '#f29b36'
    case AutobahnColor.PURPLE:
      return '#795da6'
    case AutobahnColor.WHITE:
      return '#eee'
    case AutobahnColor.BLACK:
      return '#24303d'
    case AutobahnColor.YELLOW:
      return '#f4de5d'
    default:
      throw new Error(`Invalid player color: ${autobahnColor}.`)
  }
}
