import 'package:flutter/material.dart';

/// Lays [children] out in rows of [columns], giving every item in a row the same height.
///
/// Intended for short lists (a handful of cards); each row is measured with [IntrinsicHeight].
class ResponsiveGrid extends StatelessWidget {
  const ResponsiveGrid({required this.columns, required this.children, this.spacing = 20, super.key});

  final int columns;
  final double spacing;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    // Rows are always bounded by IntrinsicHeight, so children may use Expanded/Spacer.
    final columns = this.columns < 1 ? 1 : this.columns;
    final rows = <Widget>[];
    for (var start = 0; start < children.length; start += columns) {
      final cells = <Widget>[];
      for (var i = 0; i < columns; i++) {
        if (i > 0) cells.add(SizedBox(width: spacing));
        final index = start + i;
        cells.add(Expanded(child: index < children.length ? children[index] : const SizedBox.shrink()));
      }
      if (rows.isNotEmpty) rows.add(SizedBox(height: spacing));
      rows.add(
        IntrinsicHeight(
          child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: cells),
        ),
      );
    }
    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: rows);
  }
}
