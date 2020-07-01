export class MediaQuery {
  constructor(public readonly name: string, public readonly mediaQuery: string) {}
}

export class MediaQueries {
  static readonly isDesktop = new MediaQuery('isDesktop', 'screen and (min-width: 1440px)');
  static readonly isTabletsHorizontal = new MediaQuery('isTabletsHorizontal', 'screen and (min-width: 1024px)');
  static readonly isMobile = new MediaQuery('isMobile', 'screen and (max-width: 767px)');
  static all() {
    return [this.isDesktop, this.isTabletsHorizontal, this.isMobile];
  }
}
