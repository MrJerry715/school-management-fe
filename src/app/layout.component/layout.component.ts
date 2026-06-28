import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  ActivatedRoute,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, CommonModule, RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);

  sidebarOpen = true;
  isMobile = false;
  isDesktop = window.innerWidth >= 768;
  headerTitle = 'School Management';
  breadcrumbs: { label: string; url: string }[] = [];
  userName = this.getDisplayName();

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.isDesktop = window.innerWidth >= 768;
    this.sidebarOpen = this.isDesktop;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setBreadcrumbs();
      });
    this.setBreadcrumbs();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 768;
    this.sidebarOpen = this.isDesktop;
    this.isMobile = window.innerWidth < 768;
  }

  private setBreadcrumbs() {
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    if (this.breadcrumbs.length > 0) {
      this.headerTitle = this.breadcrumbs[this.breadcrumbs.length - 1].label;
    }
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: { label: string; url: string }[] = []
  ): { label: string; url: string }[] {
    const children = route.children;

    for (const child of children) {
      const routeURL: string =
        child.snapshot.url.map((segment) => segment.path).join('/') ||
        child.routeConfig?.path ||
        '';

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data['breadcrumb']) {
        const label = child.snapshot.data['breadcrumb'];
        if (!breadcrumbs.some((bc) => bc.label === label)) {
          breadcrumbs.push({ label, url });
        }
      }

      this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  getInitials(name: string | null | undefined): string {
    if (!name) return '';

    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    }

    const single = words[0];
    if (single.length === 1) {
      return single.charAt(0).toUpperCase();
    }

    return single.charAt(0).toUpperCase() + single.charAt(single.length - 1).toUpperCase();
  }

  private getDisplayName(): string {
    const user = this.auth.currentUser;
    if (!user) return 'School User';

    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return name || user.username || 'School User';
  }
}
